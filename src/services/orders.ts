export async function GET() {
    try {
        const res = await fetch('/api/orders', {
           
        })
        const finalResult = await res.json()
        return finalResult
    } catch (error) {
        console.log(error);
    }
}
