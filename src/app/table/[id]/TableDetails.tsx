'use client'
import CheckBoxFilterCard from "@/app/_components/shared/CheckBoxFilterCard/CheckBoxFilterCard";
import OrderColumn from "@/app/_components/shared/OrderColumn/OrderColumn";
import ProductCard from "@/app/_components/shared/ProductCard/ProductCard";
import { SkeletonCard } from "@/app/_components/shared/SkeletonCard/SkeletonCard";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllProducts } from "@/store/slices/productSlice";
import { ArrowRightCircle, Barcode, Search, ShoppingBag } from "lucide-react";
import { useEffect } from "react";


interface TableDetailsProps {
    id: string;
}

export default function TableDetails({ id }: TableDetailsProps) {
    const tableId = id;
    console.log(tableId);


    const tableOrder = useAppSelector(state => state.ordersByTable.byTable[tableId])
    const selectedProducts = tableOrder?.items || []

    console.log(tableOrder);

    const categories = [
        {
            id: 1,
            name: "Bakrey",
            icon: 'bread.svg',
            status: false,

        },
        {
            id: 2,
            name: "Chicken",
            icon: 'chicken.svg',
            status: false,

        },
        {
            id: 3,
            name: "Meat",
            icon: 'meat.svg',
            status: false,
        },
        {
            id: 4,
            name: "Cold Drink",
            icon: 'drinkCold.svg',
            status: false,
        },
        {
            id: 5,
            name: "Hot Drink",
            icon: 'drinkHot.svg',
            status: false,
        },
        {
            id: 6,
            name: "Ice Cream",
            icon: 'iceCream.svg',
            status: false,
        },
    ]

    const products = useAppSelector(state => state.products.products);
    console.log(products);

    const dispatch = useAppDispatch()
    console.log(tableOrder);
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])

    return (
        <div className=" mt-10 mx-auto">
            <div className="container">
                <div className="grid grid-cols-4 gap-x-4">
                    <div className="content col-span-4 md:col-span-3 bg-gray-50 shadow p-3 rounded-2xl relative">
                        <Dialog >
                            <DialogTrigger asChild>
                                <span className="absolute top-0 right-0 bg-amber-400 text-white px-2 py-1 rounded-bl-md text-sm w-8 hover:w-30 duration-200 cursor-pointer md:hidden text-nowrap">
                                    <ArrowRightCircle className="inline-block me-2" size={20} />
                                    <span className="">checkout</span>
                                </span>
                            </DialogTrigger>
                            <DialogContent className=" rounded-2xl">
                                <OrderColumn selectedProducts={selectedProducts} tableId={tableId} />
                            </DialogContent>
                        </Dialog>
                        <div className="filter w-full">
                            <h1 className="text-2xl font-bold mb-5 text-center sm:text-start">New Order for Table {id}</h1>
                            <div className="search filter gap-3 flex items-center justify-between w-full">
                                <div className="relative md:w-1/3">
                                    <Input className="ps-10 placeholder:text-gray-400 md:w-full border-gray-300" type="search" placeholder="Scan Barcode" />
                                    <span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400"><Barcode size={20} /></span>
                                </div>
                                <div className="relative md:w-1/3">
                                    <Input className="ps-10 placeholder:text-gray-400 md:w-full border-gray-300" type="search" placeholder="Product Title" />
                                    <span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400"><ShoppingBag size={20} /></span>
                                </div>
                                <Button className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-md md:w-1/3  "><Search size={20} /> Search</Button>
                            </div>
                            <div className="categories flex justify-center flex-wrap gap-4 mt-5 overflow-y-auto max-h-200">
                                {categories.map(category => (
                                    <CheckBoxFilterCard key={category.id} category={category} />
                                ))
                                }
                            </div>
                        </div>
                        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
                            {products.length === 0 && Array.from({ length: 6 }).map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} tableId={tableId} />
                            ))}
                        </div>
                    </div>
                    <div className="order hidden md:block">
                        <OrderColumn selectedProducts={selectedProducts} tableId={tableId} />
                    </div>
                </div>
            </div>
        </div >
    )
}
