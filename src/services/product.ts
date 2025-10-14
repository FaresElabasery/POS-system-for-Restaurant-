
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export async function getProducts() {
    try {
        const res = await fetch(`/api/products`, {
        })
        const finalResult = await res.json()
        return finalResult
    } catch (error) {
        console.log(error);
    }
}

export async function createProduct(body) {
    try {
        const res = await fetch(`${baseUrl}/api/products`, {
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
export async function deleteProduct(id: string) {
    try {
        const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const finalResult = await res.json()
        return finalResult
    } catch (error) {
        console.log(error);
    }
}
