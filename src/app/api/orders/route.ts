import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const tableId = searchParams.get("id");

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

        const orders = await prisma.order.findMany({
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
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
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

