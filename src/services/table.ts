export async function getTables() {
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
export async function AddTable(body: { name: string, numberChair: number }) {
    try {
        const res = await fetch('/api/tables', {
            method: 'POST',
            body: JSON.stringify(body),
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
export async function DeleteTable(id: string) {
    try {
        const res = await fetch(`/api/tables/${id}`, {
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
