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
import { ICategory } from "@/Interfaces/category";
import { getCategories } from "@/services/categoreis";
import { getTables } from "@/services/table";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getOrder } from "@/store/slices/ordersSlice";
import { getAllProducts } from "@/store/slices/productSlice";
import { ArrowRightCircle, Barcode, Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

interface TableDetailsProps {
    id: string;
}

export default function TableDetails({ id }: TableDetailsProps) {
    const dispatch = useAppDispatch()
    const [tableName, setTableName] = useState<string>('')
    const [categories, setCategories] = useState<ICategory[]>([])
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
    const products = useAppSelector(state => state.products.products);
    const order = useAppSelector(state => state.orders.data);

    console.log(categoryFilter);

    const filterProducts = () => {
        let filterProducts = products.slice()
        if (categoryFilter) {
            filterProducts = filterProducts.filter((item: { category: ICategory }) => item.category.name === categoryFilter);
            return filterProducts;
        }
        if (categoryFilter == null) {
            filterProducts = products.slice();
            return filterProducts;
        }
        return
    }

    const tableId = id;
    console.log(tableId);

    console.log(products);
    async function handleGetTableName() {
        const table = await getTables();
        const tableInfo = table?.tables.filter((item: { id: string }) => item.id === tableId)[0];
        setTableName(tableInfo?.name);
    }
    async function handleGetCategories() {
        const categories = await getCategories();
        setCategories(categories);
    }


    useEffect(() => {
        handleGetTableName();
        handleGetCategories();
        dispatch(getAllProducts());
        dispatch(getOrder(tableId));
    }, [])

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
                                <OrderColumn order={order} tableId={tableId} />
                            </DialogContent>
                        </Dialog>
                        <div className="filter w-full">
                            <h1 className="text-2xl font-medium mb-5 text-center sm:text-start">New Order for <span className="font-bold text-orange-400 capitalize text-3xl">{tableName}</span> </h1>
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
                                <div onClick={() => { setCategoryFilter(null) }} className={` flex items-center gap-3 !rounded-lg border !px-6 filter-btn group  ${categoryFilter === null ? 'bg-amber-400' : ''}`}>
                                    <div className="text-sm font-bold text-main-color">All</div>
                                </div>                                {categories.map(category => (
                                    <CheckBoxFilterCard setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} key={category.id} category={category} />
                                ))}
                            </div>
                        </div>
                        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
                            {products.length === 0 && Array.from({ length: 6 }).map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                            {filterProducts()?.map((product) => (
                                <ProductCard key={product.id} product={product} tableId={tableId} />
                            ))}
                        </div>
                    </div>
                    <div className="order hidden md:block">
                        <OrderColumn order={order} tableId={tableId} />
                    </div>
                </div>
            </div>
        </div >
    )
}
