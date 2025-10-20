'use client'
import Image from "next/image";

import { AddProductToOrder, AddProductToOrderBody } from "@/app/table/[id]/TableDetials.actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IProduct } from "@/Interfaces/product";
import { deleteProduct } from "@/services/product";
import { useAppDispatch } from '@/store/hooks';
import { getAllProducts } from "@/store/slices/productSlice";
import placeholder from '@images/placeholder.svg';
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { getOrder } from "@/store/slices/ordersSlice";

export default function ProductCard({ product, tableId, from }: { product: IProduct, tableId?: string, from?: string }) {
    const dispatch = useAppDispatch()
    const { id, name, price, stock, image, code, deleted, category: { name: categoryName } } = product;
    const handleAddToTable = async () => {
        const res = await AddProductToOrder({
            tableId: tableId?.toString() || '',
            items: [{
                productId: id,
                count: 1
            }]
        } as AddProductToOrderBody)
        if (res.message) {
            toast.success(res.message, {
                position: 'top-right'
            })
            dispatch(getOrder(tableId || ''));
        }
        else {
            toast.error(res.error, {
                position: 'top-right'
            })
        }
    }
    const handleDeleteProduct = async () => {
        const res = await deleteProduct(id)
        if (res.message === 'Product deleted successfully') {
            dispatch(getAllProducts())
            toast.success(res.message, {
                position: 'top-right'
            })
        }
        else {
            toast.error(res.error, {
                position: 'top-right'
            })
            dispatch(getAllProducts())
        }
    }

    return (
        <div {...(from !== 'products' ? { onClick: handleAddToTable } : {})} className={`bg-gray-200 hover:bg-gray-300 duration-200 active:scale-105 px-4 py-2 rounded-2xl shadow-md relative overflow-hidden ${stock < 1 && from !== 'products' ? 'hidden' : ''} ${from !== 'products' ? 'cursor-pointer' : ''}`}>
            {from === 'products' && (
                <>
                    <Dialog >
                        <DialogTrigger>
                            <button className="absolute bottom-0 -right-10 hover:right-0 duration-200 text-xs text-white font-medium bg-red-500 flex items-center p-1 hover:bg-red-600  rounded-s-2xl gap-1 cursor-pointer "><Trash className="size-4" /> Delete</button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Product</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the product
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex justify-end">
                                <DialogClose asChild>
                                    <Button variant="outline" className="cursor-pointer">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button variant="destructive" className="cursor-pointer" onClick={handleDeleteProduct}>Delete</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            )}
            <span className="absolute top-2 right-2 text-xs text-orange-500 font-medium">Stock {stock}</span>
            <p className="absolute top-3 left-3 text-xs font-medium text-gray-500">Code : {code}</p>
            <div className="flex flex-col justify-between ">
                <div className={`flex justify-between my-1 ${from !== 'products' ? 'mt-8' : ''}`}>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-xl">{name}</h3>
                        <div className="flex gap-2">
                            <h6 className="text-xs w-fit px-2 font-medium py-1 text-orange-500 bg-white rounded-2xl">{categoryName}</h6>
                            {deleted && <h6 className="text-xs w-fit px-2 font-medium py-1 text-white bg-red-500 rounded-2xl">Deleted</h6>}
                        </div>
                        <p className="text-sm text-gray-600">Price: <span className="font-medium text-lg">{price} EGP</span></p>
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
