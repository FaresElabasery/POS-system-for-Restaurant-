'use client'
import { IProduct } from '@/Interfaces/product';
import { Button } from '@/components/ui/button';
import OrderCard from '../OrderCard/OrderCard';
import { useAppDispatch } from '@/store/hooks';
import { clearOrderFromTable, completeOrderForTable } from '@/store/slices/ordersByTableSlice';
import { updateTableStatus } from '@/store/slices/tableSlice';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
export default function OrderColumn({ selectedProducts, tableId }: { selectedProducts: IProduct[], tableId: string }) {
    const route = useRouter();
    const handleTotalOrders = () => {
        return selectedProducts.reduce((acc, item) => acc + item?.price * Number(item?.count), 0);
    }
    const dispatch = useAppDispatch()

    const handlePlaceOrder = () => {
        dispatch(completeOrderForTable({ tableId }));
        dispatch(updateTableStatus({ tableId: tableId, status: "closed" }));
        toast.success("Order placed successfully");
        route.push("/table");
    }

    const handleCancelOrder = () => {
        dispatch(clearOrderFromTable({ tableId }));
        dispatch(updateTableStatus({ tableId: tableId, status: "closed" }));
        toast.success("Order canceled ");
        route.push("/table");
    }

    return (
        <>
            <div className="bg-white p-4 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold mb-5">Order Summary</h2>
                <div className="order-items flex flex-col gap-4 overflow-y-auto h-70 sm:h-85 pb-4">
                    {selectedProducts.length === 0 && <p className="text-center text-gray-500">No orders placed yet.</p>}
                    {selectedProducts?.map((product) => (
                        <OrderCard key={product.id} product={product} tableId={tableId} />
                    ))}
                </div>
                <div className="total mt-5">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-2xl">Total:</span>
                        <span className="font-bold text-3xl text-amber-400">$ {handleTotalOrders()}</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <Button className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-md w-full" disabled={selectedProducts.length === 0} onClick={() => handlePlaceOrder()}>Place Order</Button>
                        <Button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md w-full" disabled={selectedProducts.length === 0} onClick={() => handleCancelOrder()}>Cancel Order</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
