import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany()
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
    const { code, name, price, stock, image } = body
    try {
        const newProduct = await prisma.product.create({
            data: {
                code,
                name,
                price,
                stock,
                image,
            }
        })
        return NextResponse.json({ message: 'product created successfully', newProduct }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'error creating product' }, { status: 500 })
    }
}