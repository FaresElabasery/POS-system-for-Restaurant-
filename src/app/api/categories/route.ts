import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const data = await prisma.category.findMany()
        return NextResponse.json({ message: 'success', data }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'error fetching categories' }, { status: 500 })
    }
}
export async function POST(req: Request) {
    const body = await req.json();
    const { name, image } = body
    try {
        const newCategory = await prisma.category.create({
            data: {
                name, image
            }
        })
        return NextResponse.json({ message: 'category created successfully', newCategory }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'error creating category' }, { status: 500 })
    }
}
export async function DELETE(req: Request) {
    const body = await req.json()
    const { id } = body
    try {
        const existing = await prisma.product.findFirst({
            where: {
                categoryId: id
            }
        })
        if (existing) {
            return NextResponse.json({ error: 'Category is in use in a product' }, { status: 400 })
        }

        const deletedCategory = await prisma.category.delete({
            where: {
                id
            },
            include: {
                products: true
            }
        })
        return NextResponse.json({ message: 'category deleted successfully', deletedCategory }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'error deleting category' }, { status: 500 })
    }
}