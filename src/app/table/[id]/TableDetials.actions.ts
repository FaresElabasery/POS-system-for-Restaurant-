import { DeleteParams } from "@/app/api/orders/tables/[id]/[productId]/route";

export async function deleteProductFromOrder(params: DeleteParams) {
    try {
        const { id, productId } = params;
        const req = await fetch(`/api/orders/tables/${id}/${productId}`, {
            method: 'DELETE',
        })
        const final = await req.json()
        console.log('Final Result', final);
        return final;
    } catch (error) {
        console.error("Error removing product from order:", error);
    }
}

export type AddProductToOrderBody = {
    tableId: string;
    items: {
        productId: string;
        count: number;
    }[];
}
export async function AddProductToOrder(body: AddProductToOrderBody) {
    try {
        const req = await fetch(`/api/orders`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const final = await req.json()
        console.log('Final Response of adding product to order:', final);
        return final;
    } catch (error) {
        console.error("Error adding product to order:", error);
    }
}
export async function UpdateProductCountInOrder(params: DeleteParams, count: number) {
    try {
        const { id, productId } = params;
        const req = await fetch(`/api/orders/tables/${id}/${productId}`, {
            method: 'PATCH',
            body: JSON.stringify({ count }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const final = await req.json()
        console.log('Final Result', final);
        return final;
    } catch (error) {
        console.error("Error updating product count in order:", error);
    }
}
export async function CloseOrder(id: string, orderId: string) {
    try {
        const req = await fetch(`/api/orders/tables/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: orderId }),
        })
        const final = await req.json()
        console.log('cancel Order', final);
        return final;
    } catch (error) {
        console.error("Error closing order:", error);
    }
}
export async function PlaceOrder(id: string, orderId: string) {
    try {
        const req = await fetch(`/api/orders/tables/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: orderId }),
        })
        const final = await req.json()
        console.log('Place Order', final);
        return final;
    } catch (error) {
        console.error("Error placing order:", error);
    }
}
