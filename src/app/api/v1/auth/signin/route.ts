import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()
        if (!email || !password) {
            return NextResponse.json({
                message: 'email and password are required',
            }, { status: 400 })
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            return NextResponse.json({
                message: 'User not found',
            }, { status: 400 })
        }
    
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            return NextResponse.json({ message: "Invalid username or Password" }, { status: 401 })
        }
        return NextResponse.json({
            message: "successfully signed in",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}