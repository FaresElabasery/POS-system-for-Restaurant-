import { IProduct } from "./product";

export type OrderItem = IProduct & { count: number }

export type SingleOrder = {
    id: number,
    items: OrderItem[],
    status: 'closed' | 'opened',
    createdAt: string
}
export type OrderState = {
    byTable: Record<number, SingleOrder | undefined>
}