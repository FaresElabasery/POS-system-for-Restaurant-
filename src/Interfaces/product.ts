import { ICategory } from "./category"

export type IProduct = {
    id: string,
    code: string
    name: string,
    price: number,
    stock: number,
    image?: string
    category: ICategory
    deleted: boolean
}


