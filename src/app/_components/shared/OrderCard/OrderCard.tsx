'use client'
import { deleteProductFromOrder, UpdateProductCountInOrder } from "@/app/table/[id]/TableDetials.actions";
import { IProduct } from "@/Interfaces/product";
import { useAppDispatch } from "@/store/hooks";
import { getOrder } from "@/store/slices/ordersSlice";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type IProductWithCount = {
    product: IProduct,
    count: number
}
export default function OrderCard({ product, tableId }: { product: IProductWithCount, tableId: string }) {
    const dispatch = useAppDispatch();
    const { name, price, code, stock, id } = product.product;
    console.log(product);

    const handleDeleteProduct = async () => {
        const res = await deleteProductFromOrder({ id: tableId.toString(), productId: id.toString() });
        if (res.message) {
            toast.success(res.message);
            dispatch(getOrder(tableId));
        } else {
            toast.error(res.error);
        }
    }
    const handleUpdateCount = async (count: number) => {
        const res = await UpdateProductCountInOrder({ id: tableId.toString(), productId: id.toString() }, count);
        if (!res.error) {
            toast.success(res.message);
            dispatch(getOrder(tableId));
        } else {
            toast.error(res.error);
        }
    }
    return (
        <div className="bg-gray-200 px-4 py-2 rounded-2xl shadow-md relative">
            <span onClick={handleDeleteProduct} className="absolute top-2 right-4 text-xs text-orange-500 font-medium flex-center bg-white rounded-full size-6 active:scale-105 hover:bg-red-500 hover:text-white"><Trash size={18} /></span>
            <div className="flex flex-col justify-between ">
                <p className="text-sm text-gray-500">Product Code : {code}</p>
                <div className="flex  justify-between my-3">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-xl">{name}</h3>
                        <div className="flex justify-between w-full">
                            <h3 className="">Price: {price}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col items-end ">
                        {/* increase and decrease */}
                        <div className="flex items-center justify-between  bg-white rounded-md border-2">
                            <button disabled={product.count <= 1} onClick={() => handleUpdateCount(-1)} className="w-8 h-8 flex border-r items-center justify-center text-gray-600 hover:text-gray-800">
                                <span className="text-lg font-bold">-</span>
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-gray-600 font-bold">{product.count}</span>
                            <button disabled={product.count >= stock} onClick={() => handleUpdateCount(1)} className="w-8 h-8 flex  border-l items-center justify-center text-gray-600 hover:text-gray-800">
                                <span className="text-lg font-bold">+</span>
                            </button>
                        </div>
                        <p className="my-2">{price}</p>
                        <p className="text-sm">Total: <span className="font-bold text-lg">  {price * product.count}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
