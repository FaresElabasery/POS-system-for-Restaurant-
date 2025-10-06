import { StaticImageData } from "next/image"

export type IProduct = {
    id: number,
    code: string
    name: string,
    price: number,
    stock: number,
    image?: StaticImageData 
    count: number
}
