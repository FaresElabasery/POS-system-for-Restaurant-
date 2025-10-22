import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export type DeleteParams = {
    id: string;
    productId: string;
};

export async function DELETE(
    req: Request,
    context: { params: Promise<DeleteParams> }
) {
    const { id, productId } = await context.params;
    try {

        const existingOrder = await prisma.order.findFirst({
            where: {
                tableId: id,
                status: "opened",
            },
            include: {
                items: true,
            },
        });

        if (!existingOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const itemToRemove = existingOrder.items.find(
            (item) => String(item.productId) === String(productId)
        );

        if (!itemToRemove) {
            return NextResponse.json(
                { error: "Product not found in order" },
                { status: 404 }
            );
        }

        await prisma.orderItem.delete({
            where: { id: itemToRemove.id },
        });

        return NextResponse.json(
            { message: "Product removed from order successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error removing product from order:", error);
        return NextResponse.json(
            { error: "Failed to remove product from order" },
            { status: 500 }
        );
    }
}
export async function PATCH(
    req: Request,
    context: { params: Promise<DeleteParams> }
) {
    const { id, productId } = await context.params;
    const body = await req.json();
    const { count } = body;
    try {
        const existingTable = await prisma.table.findFirst({
            where: {
                id
            }
        })
        if (!existingTable) {
            return NextResponse.json({ error: "Table not found" }, { status: 404 });
        }
        const existingOrder = await prisma.order.findFirst({
            where: {
                tableId: id,
                status: "opened",
            },
            include: {
                items: true,
            },
        });
        if (!existingOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        const existingItem = existingOrder.items.find(
            (item) => String(item.productId) === String(productId)
        );
        if (!existingItem) {
            return NextResponse.json({ error: "Product not found in order" }, { status: 404 });
        }
        const existingProduct = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        if (existingProduct?.stock && existingProduct.stock < (existingItem.count + count)) {
            return NextResponse.json({ error: "Not enough stock" }, { status: 400 });
        }
        await prisma.orderItem.update({
            where: { id: existingItem.id },
            data: { count: existingItem.count + count },
        });
        return NextResponse.json(
            { message: "Product count updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to update product count" },
            { status: 500 }
        );
    }
}

