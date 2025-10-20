import { Separator } from "@/components/ui/separator";

export default function page() {
    return (
        <div className="orders">
            <div className="container w-full md:w-10/12 mx-auto">
                <div className="content">
                    <div className='title my-10 flex-center gap-2'>
                        <h1 className='text-5xl font-bold text-center'>Orders</h1>
                    </div>
                    <div className='flex items-end flex-col'>
                        <Separator className="my-4" />
                        <span className='text-sm font-medium text-center text-gray-400'>Orders Number : </span>
                    </div>
                    <div className="orderCard border-s-4 mt-4 border-orange-500 rounded-2xl p-4  mx-auto shadow flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Order #122123</h1>
                        <p className="text-sm font-medium  text-gray-400">Table </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
