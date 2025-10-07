import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                table: true,
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })
        return NextResponse.json({ message: 'success', orders }, { status: 200 })
    } catch (error) {
        console.log('error fetching orders', error);
        return NextResponse.json({ message: 'error fetching orders' }, { status: 500 })
    }
}
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { tableId, items } = body;

        if (!tableId || !items || !Array.isArray(items)) {
            return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
        }

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
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        await prisma.table.update({
            where: { id: tableId },
            data: { status: "opened" },
        });

        return NextResponse.json({ message: 'order created successfully', newOrder }, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}

