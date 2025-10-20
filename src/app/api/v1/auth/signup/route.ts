import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    const { email, password, name, role, rePassword } = await req.json()
    try {
        if (!email || !password || !name || !rePassword) {
            return NextResponse.json({
                error: 'All fields are required',
            }, { status: 400 })
        }
        if (password !== rePassword) {
            return NextResponse.json({
                error: 'Passwords do not match',
            }, { status: 400 })
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return NextResponse.json({
                error: 'User already exists',
            }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                rePassword : hashedPassword,
                role: role || 'user',
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })

        return NextResponse.json({ message: "User created successfully", user }, { status: 201 })
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}