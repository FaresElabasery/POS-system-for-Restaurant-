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