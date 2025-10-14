'use server'
import { revalidatePath } from "next/cache"
export async function createCategory(params: { name: string, image: string }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        revalidatePath('/category')
        const finalRes = await res.json()
        return finalRes
    } catch (error) {
        console.log(error);
    }
}
export async function deleteCategory(body: { id: string }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        revalidatePath('/category')
        const finalRes = await res.json()
        return finalRes
    } catch (error) {
        console.log(error);
    }
}