import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { tableId, items } = body;

        if (!tableId || !items || !Array.isArray(items)) {
            return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
        }

        const existingOrder = await prisma.order.findFirst({
            where: { tableId, status: "opened" },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
            },
        });

        if (existingOrder) {
            await Promise.all(
                items.map(async (item) => {
                    const existingItem = existingOrder.items.find(
                        (i) => i.productId === item.productId
                    );
                    const existingProduct = await prisma.product.findUnique({
                        where: { id: item.productId },
                    });
                    
                    if (existingProduct?.stock && existingProduct.stock < existingItem?.count + item.count) {
                        return NextResponse.json({ error: "Not enough stock" }, { status: 400 });
                    }

                    if (existingItem) {
                        await prisma.orderItem.update({
                            where: { id: existingItem.id },
                            data: { count: existingItem.count + item.count },
                        });
                    } else {
                        await prisma.orderItem.create({
                            data: {
                                orderId: existingOrder.id,
                                productId: item.productId,
                                count: item.count,
                            },
                        });
                    }
                })
            );

            const updatedOrder = await prisma.order.findUnique({
                where: { id: existingOrder.id },
                include: { items: { include: { product: true } } },
            });
            return NextResponse.json(
                { message: "Order updated successfully", order: updatedOrder },
                { status: 200 }
            );
        } else {
            const newOrder = await prisma.order.create({
                data: {
                    tableId,
                    status: "opened",
                    items: {
                        create: items.map((item) => ({
                            productId: item.productId,
                            count: item.count,
                        })),
                    },
                },
                include: {
                    items: { include: { product: true } },
                },
            });

            await prisma.table.update({
                where: { id: tableId },
                data: { status: "opened" },
            });
            return NextResponse.json(
                { message: "Order created successfully", order: newOrder },
                { status: 201 }
            );
        }
    } catch (error) {
        console.error("Error creating/updating order:", error);
        return NextResponse.json({ error: "Failed to create or update order" }, { status: 500 });
    }
}


export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                table: true,
                items: {
                    include: {
                        product: true
                    }
                },
            },
        })
        const ordersWithTotal = orders.map(order => {
            const totalPrice = order.items.reduce((acc, item) => {
                return acc + (item.count * (item.product?.price || 0));
            }, 0);
            return { ...order, totalPrice };
        });
        return NextResponse.json({ orders: ordersWithTotal }, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
