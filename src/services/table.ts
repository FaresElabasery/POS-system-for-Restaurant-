export async function getAllTables() {
    try {
        const res = await fetch('/api/tables', {
            next: {
                revalidate: 10
            }
        })
        const finalResult = await res.json()
        return finalResult
    } catch (error) {
        console.log(error);
    }
}