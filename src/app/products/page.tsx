'use client'
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAllProducts } from '@/store/slices/productSlice';
import { useEffect } from 'react';
import AddProductModal from '../_components/shared/AddProductModal/AddProductModal';
import ProductCard from '../_components/shared/ProductCard/ProductCard';
import { IProduct } from '@/Interfaces/product';

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
                    <AddProductModal />
                </div>
                <div className='flex items-end flex-col'>
                    <Separator className="my-4" />
                    <span className='text-sm font-medium text-center text-gray-400'>Products Lenght : {Products.length} </span>
                </div>
                <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                    {Products.map((product :IProduct) => (
                        <ProductCard key={product.id} product={product} from='products' />
                    ))}
                </div>
            </div>
        </div>
    )
}
