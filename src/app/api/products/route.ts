import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            }
        })
        console.log(products);
        return NextResponse.json({
            message: 'success',
            products
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'error fetching products' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    const { code, name, price, stock, image, categoryId } = body
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        })
        if (!category) {
            return NextResponse.json({ message: 'category not found' }, { status: 404 })
        }
        const newProduct = await prisma.product.create({
            data: {
                code,
                name,
                price,
                stock,
                image,
                categoryId,
            }
        })
        return NextResponse.json({ message: 'product created successfully', newProduct }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'error creating product' }, { status: 500 })
    }
}