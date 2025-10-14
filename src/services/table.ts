
export async function getTables() {
    try {
        const res = await fetch('/api/orders/tables', {
        })
        const finalResult = await res.json()
        return finalResult
    } catch (error) {
        console.log(error);
    }
}
export async function AddTable(body: { name: string, numberChair: number }) {
    try {
        const res = await fetch('/api/orders/tables', {
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
        const res = await fetch(`/api/orders/tables/${id}`, {
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
export async function getTableOrder(id: string) {
    try {
        const res = await fetch(`/api/orders/tables/${id}`, {
            method: 'GET',
        })
        const finalResult = await res.json()
        if (finalResult.message === "success") {
            return finalResult.orders
        }
    } catch (error) {
        console.log(error);
    }
}

