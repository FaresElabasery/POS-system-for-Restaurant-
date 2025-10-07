import Image from "next/image";

import { IProduct } from "@/Interfaces/product";
import placeholder from '@images/placeholder.svg';
import { useAppDispatch } from '@/store/hooks';
import { addproductToTable } from "@/store/slices/ordersByTableSlice";
import { openTable } from "@/store/slices/tableSlice";

export default function ProductCard({ product, tableId }: { product: IProduct, tableId?: number }) {
    const dispatch = useAppDispatch()
    const { name, price, stock, image, code } = product;
    const handleAddToTable = () => {
        if (!tableId) return;
        dispatch(addproductToTable({ tableId, product }));
        dispatch(openTable({ tableId }));
    }
    return (
        <div onClick={handleAddToTable} className="bg-gray-200 hover:bg-gray-300 duration-200 active:scale-105 p-4 rounded-2xl shadow-md relative">
            <span className="absolute top-2 right-2 text-xs text-orange-500 font-medium">Stock {stock}</span>
            <div className="flex flex-col justify-between ">
                <p className="text-sm text-gray-500">Product Code : {code}</p>
                <div className="flex  justify-between my-3">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-xl">{name}</h3>
                        <p className="">Price: {price} EGY</p>
                    </div>
                    <Image src={image || placeholder} alt={name} width={50} height={50} className="rounded-full size-20" />
                </div>
            </div>
            {stock <= 3 &&
                <div className="text-sm text-red-500 font-medium">Only {stock} left in stock.</div>
            }
        </div>
    )
}
