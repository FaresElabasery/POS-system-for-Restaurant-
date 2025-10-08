import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        console.log(id);

        const existing = await prisma.product.findUnique({
            where: {
                id
            }
        })
        if (!existing) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        await prisma.product.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}