export async function getCategories() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,{
            cache:'force-cache'
        })
        const finalRes = await res.json()
        if (finalRes.message) {
            return finalRes.data
        }
    } catch (error) {
        console.log(error);
    }
}