import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const id = params.id
    try {
        const existing = await prisma.table.findUnique({
            where: {
                id
            }
        })
        if (!existing) {
            return NextResponse.json({ error: 'Table not found' }, { status: 404 });
        }
        await prisma.table.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: 'Table deleted successfully' }, { status: 200 });

    } catch (error) {
        console.log('error Deleting table', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const tableId = params.id
        if (!tableId) {
            return NextResponse.json(
                { error: "tableId is required" },
                { status: 400 }
            );
        }

        const existing = await prisma.table.findUnique({
            where: { id: tableId },
        });

        if (!existing) {
            return NextResponse.json(
                { error: "Table not found" },
                { status: 404 }
            );
        }

        const orders = await prisma.order.findFirst({
            where: { tableId: tableId },
            include: {
                table: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json(
            { message: "success", orders },
            { status: 200 },
        );
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const body = await req.json()
    const { id: orderId } = body
    try {
        const existingTable = await prisma.table.findFirst({
            where: {
                id
            }
        })
        if (!existingTable) {
            return NextResponse.json({ error: "Table not found" }, { status: 404 });
        }
        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }
        const order = await prisma.order.delete({
            where: { id: orderId as string },
        })
        await prisma.table.update({
            where: {
                id: order.tableId
            },
            data: {
                status: "closed"
            }
        })

        return NextResponse.json(
            { message: "Order cancelled successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to cancel order" },
            { status: 500 }
        );
    }
}


export async function PATCH(req: Request) {
    try {
        const body = await req.json()
        const { id } = body

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                table: true,
            },
        });
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        for (const item of order.items) {
            const currentStock = item.product?.stock ?? 0;
            const newStock = currentStock - item.count;

            if (newStock < 0) {
                return NextResponse.json(
                    { error: `Insufficient stock for product: ${item.product?.name}` },
                    { status: 400 }
                );
            }

            await prisma.product.update({
                where: { id: item.productId },
                data: { stock: newStock },
            });
        }

        await prisma.order.delete({
            where: { id },
            include: {
                items: true,
            },
        });
        

        await prisma.table.update({
            where: { id: order.tableId },
            data: { status: "closed" },
        });

        return NextResponse.json(
            { message: "Order placed successfully. Table closed and stock updated." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error placing order:", error);
        return NextResponse.json(
            { error: "Failed to place order" },
            { status: 500 }
        );
    }
}
