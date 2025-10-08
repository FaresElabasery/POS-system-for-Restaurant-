import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('image') as File

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 })
        }

        // تحويل الصورة إلى base64
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

        // رفع إلى Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(base64, {
            folder: 'pos_products',
        })

        return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 })
    } catch (error: any) {
        console.error('Cloudinary upload failed:', error)
        return NextResponse.json(
            { error: error.message || 'Upload failed' },
            { status: 500 }
        )
    }
}
