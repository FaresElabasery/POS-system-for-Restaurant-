const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function getAllOrder() {
    try {
        const res = await fetch(`${baseUrl}/api/orders`,{
            cache:'no-store'
        })
        const data = await res.json()
        console.log(data.orders);
        return data.orders
    } catch (error) {
        console.log(error);
        return []
    }
}