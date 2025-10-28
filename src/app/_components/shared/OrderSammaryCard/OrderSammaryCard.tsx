import { IOrder } from "@/Interfaces/order";
import moment from "moment";

export default function OrderSammaryCard({ order, orderCodes }: { order: IOrder, orderCodes: string }) {
    const tableName = order.table?.name || 'Unknown Table'
    const orderItems = order.items.map(item => ({
        name: item.product.name,
        quantity: item.count,
        price: item.product.price,
        totalPrice: item.product.price * item.count,
    }))

    return (
        <div
            key={order.id}
            className="orderCard border-s-4 border-orange-500 rounded-2xl p-4 shadow-md border-t-2 border-t-gray-100 flex flex-col gap-4 relative">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                Order
                <span className="text-xl font-medium text-gray-500"> {orderCodes}</span>
            </h2>
            <p className="text-sm font-medium text-gray-400 text-start">
                Table: <span className="py-1 px-2 bg-orange-500 text-white rounded-full text-xs">  {tableName}</span>
            </p>
            <span className="text-sm text-gray-500 absolute top-4 right-4">
                {order.status == 'opened' ?
                    <span className="bg-green-500 capitalize text-white py-1 px-2 rounded-full text-xs">Opened</span>
                    :
                    <span className="bg-red-500 capitalize text-white py-1 px-2 rounded-full text-xs">Closed</span>
                }
            </span>
            <p className="text-sm text-gray-500 text-start">
                Items: {order.items.length}
            </p>
            <div className="order-items flex flex-col gap-2">
                {orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <span className="text-sm text-gray-500">{item.quantity} x {item.name}</span>
                        <span className="text-sm font-medium text-gray-500">${(item.totalPrice).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="total-price text-right text-xl   font-bold text-orange-500">Total Price: ${order.totalPrice?.toFixed(2) || '0.00'}</div>
            <p className="text-xs font-semibold text-gray-500 text-right">
                Date: {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
        </div>
    )
}
