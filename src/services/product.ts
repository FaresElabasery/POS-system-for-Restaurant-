import { IProduct } from "@/Interfaces/product";

export async function getProducts() {
    try {
        const res = await fetch(`/api/products`)
        const finalResult = await res.json()
        return finalResult
    } catch (error) {
        console.log(error);
    }
}

export async function createProduct(body: IProduct) {
    try {
        const res = await fetch(`/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const finalResult = await res.json()
        return finalResult
    } catch (error) {
        console.log(error);
    }
}