import { Separator } from "@/components/ui/separator";
import { IOrder } from "@/Interfaces/order";
import { getAllOrder } from "@/services/orders";
import OrderSammaryCard from "../_components/shared/OrderSammaryCard/OrderSammaryCard";
import Link from "next/link";
import OrderSammaryModal from "../_components/shared/OrderSammaryModal/OrderSammaryModal";

export default async function page() {
    const orders = await getAllOrder()
    const orderCodes = `ORD-${Date.now().toString().slice(-6)}`
    return (
        <div className="orders">
            <div className="container w-full md:w-10/12 mx-auto">
                <div className="content">
                    <div className='title my-10 flex-center gap-2'>
                        <h1 className='text-5xl font-bold text-center'>Orders</h1>
                    </div>
                    <div className='flex items-end flex-col'>
                        <Separator className="my-4" />
                        <span className='text-sm font-medium text-center text-gray-400'>Orders Number :{orders.length || 'No Orders'} </span>
                    </div>
                    <div className="orders-list flex flex-col gap-4">
                        {orders.map((order: IOrder) => (
                            order.status == 'opened' ? (
                                <Link href={`/table/${order.tableId}`}  key={order.id + order.tableId}>
                                    <OrderSammaryCard order={order} orderCodes={orderCodes} />
                                </Link>
                            ) :
                                <OrderSammaryModal orderCodes={orderCodes} key={orderCodes} order={order} />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}
