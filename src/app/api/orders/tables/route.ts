import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const tables = await prisma.table.findMany(
            { orderBy: { name: "asc" } })
        return NextResponse.json({ message: 'success', tables })
    } catch (error) {
        console.log('error Fetching tables', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { name, numberChair } = body;
    if (!name || !numberChair) {
        return NextResponse.json({ error: 'name and Number of chairs are required' }, { status: 400 });
    }
    try {
        const table = await prisma.table.create({
            data: {
                name,
                numberChair,
                status: 'closed'
            }
        })
        return NextResponse.json({ message: 'Table created successfully', table }, { status: 201 })
    } catch (error) {
        console.log('error Creating table', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


