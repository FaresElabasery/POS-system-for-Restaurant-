'use client'
import { IOrder } from '@/Interfaces/order';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import OrderCard from '../OrderCard/OrderCard';
import { CloseOrder, PlaceOrder } from '@/app/table/[id]/TableDetials.actions';
export default function OrderColumn({ order, tableId }: { order: IOrder, tableId: string }) {
    const route = useRouter();


    const handleTotalOrders = () => {
        return order?.items?.reduce((acc, item) => acc + item?.count * Number(item?.product?.price), 0);
    }

    const handlePlaceOrder = async () => {
        const res = await PlaceOrder(tableId, order.id);
        console.log(res);
        if (res?.message) {
            toast.success("Order placed successfully");
            route.push("/table");
        } else {
            toast.error("Order canceled failed");
            route.refresh()
        }
    }
    const handleCancelOrder = async () => {
        const res = await CloseOrder(tableId, order.id);
        if (res?.message) {
            toast.success("Order canceled ", {
                position: 'top-right'
            });
            route.push("/table");
        } else {
            toast.error("Order canceled failed", {
                position: 'top-right'
            });
            route.refresh()
        }
    }


    return (
        <>
            <div className="bg-white p-4 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold mb-5">Order Summary</h2>
                <div className="order-items flex flex-col gap-4 overflow-y-auto h-70 sm:h-85 pb-4">
                    {order?.items?.length === 0 || order === null && <p className="text-center text-gray-500">No orders placed yet.</p>}
                    {order?.items?.map((product) => (
                        <OrderCard key={product.id} product={product} tableId={tableId} />
                    ))}
                </div>
                <div className="total mt-5">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-2xl">Total:</span>
                        <span className="font-bold text-3xl text-amber-400">$ {handleTotalOrders()}</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <Button className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-md w-full" disabled={order?.items?.length === 0 || order === null} onClick={() => handlePlaceOrder()}>Place Order</Button>
                        <Button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md w-full" disabled={order === null} onClick={() => handleCancelOrder()}>Cancel Order</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
