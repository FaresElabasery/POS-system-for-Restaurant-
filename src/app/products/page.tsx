'use client'
import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAllProducts } from '@/store/slices/productSlice';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import AddProductModal from '../_components/shared/AddProductModal/AddProductModal';
import ProductCard from '../_components/shared/ProductCard/ProductCard';

export default function Products() {
    const Products = useAppSelector(state => state.products.products);
    const dispach = useAppDispatch()
    useEffect(() => {
        dispach(getAllProducts())
    }, [dispach])

    return (
        <div className="products">
            <div className="container">
                <div className='title my-10 flex-center gap-2'>
                    <h1 className='text-5xl font-bold text-center'>All Products</h1>
                    <Dialog>
                        <Tooltip >
                            <TooltipTrigger asChild>
                                <DialogTrigger asChild>
                                    <span className=' flex-center size-8 bg-amber-600 hover:scale-105 duration-200 hover:bg-amber-300 text-white rounded-full'><Plus /></span>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent className='bg-amber-600 text-white'>
                                <p>Add New Product</p>
                            </TooltipContent>
                        </Tooltip>
                        <AddProductModal />
                    </Dialog>
                </div>
                <div className='flex items-end flex-col'>
                    <Separator className="my-4" />
                    {/* length and filters */}
                    <span className='text-sm font-medium text-center text-gray-400'>Products Lenght : {Products.length} </span>
                </div>
                <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                    {Products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}
