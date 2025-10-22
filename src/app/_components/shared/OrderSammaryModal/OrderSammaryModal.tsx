'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import OrderSammaryCard from '../OrderSammaryCard/OrderSammaryCard'
import OrderReceipt from '../OrderReceipt/OrderReceipt'
import { IOrder } from "@/Interfaces/order"
export default function OrderSammaryModal({ order, orderCodes }: { order: IOrder, orderCodes: string }) {
    return (
        <Dialog>
            <DialogTrigger className='w-full'>
                <OrderSammaryCard order={order} orderCodes={orderCodes} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>
                        <OrderReceipt order={order} orderCodes={orderCodes} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
