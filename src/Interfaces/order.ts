import { IProduct } from "./product"
import { ITable } from "./table"

export interface IOrder {
    id: string
    tableId: string
    status: string
    createdAt: string
    table: ITable
    items: Item[]
    totalPrice?: number
}
export interface Item {
    id: string
    productId: string
    count: number
    orderId: string
    product: IProduct
}