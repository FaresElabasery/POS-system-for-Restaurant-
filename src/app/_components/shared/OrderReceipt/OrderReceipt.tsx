'use client'
import { Button } from "@/components/ui/button";
import { IOrder } from "@/Interfaces/order";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

type OrderReceiptProps = {
    order: IOrder & { totalPrice: number },
    orderCodes: string
}
export default function OrderReceipt({ order, orderCodes }: OrderReceiptProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const { data: session } = useSession();
    if (!session) {
        return null;
    }

    const orderItems = order?.items.map((item) => item.product) || [];
    console.log('test', orderItems);

    return (
        <div className="flex gap-3 flex-col ">
            <div ref={contentRef} className="relative rounded-md min-h-110 w-full shadow-2xl print:shadow-none  p-3 bg-white text-gray-900">
                <div className="py-2">
                    <div className="text-center text-xl font-bold">ORDER</div>
                    <div className="text-center text-sm font-bold">KARAM ELSAM</div>
                    <div className="text-center text-xs font-bold">The order details</div>
                </div>
                <div className="text-center text-xs font-bold mb-1">~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
                <div className="text-xs pl-2">
                    <div className="text-xs mb-1">Customer: {session?.user?.name}</div>
                    <div className="text-xs mb-1">OrderNumber: {orderCodes}</div>
                    <div className="text-xs mb-1">Order Table: {order.table.name}</div>
                </div>
                <div className="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3">
                    <div className="flex text-sm pt-1 px-1">
                        <span className="w-2/6">Name</span>
                        <span className="w-2/6 text-right">Number</span>
                        <span className="w-2/6 text-right">Price</span>
                    </div>
                    <div className="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
                        {orderItems?.map((item, i) => (
                            <div className="flex justify-between text-sm" key={i}>
                                <span className="w-2/6 truncate">{item.name}</span>
                                <span className="w-2/6 text-right">{order.items[i].count}</span>
                                <span className="w-2/6 text-right">${item.price}</span>
                            </div>
                        ))} 
                    </div>
                </div>
                <div className="text-xs">
                    <div className="font-bold text-end text-lg">Total: ${order.totalPrice}</div>
                </div>
                <div className="text-right mt-50 absolute bottom-0 right-2">
                    <div className="font-semibold ">Date: {moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
                </div>
            </div>
            <div className="w-full">
                <Button onClick={reactToPrintFn} className="w-full">Print</Button>
            </div>
        </div>
    )
}
