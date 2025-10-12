'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { createProduct } from "@/services/product";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import Image from "next/image";
import { getAllProducts } from "@/store/slices/productSlice";
import { useAppDispatch } from "@/store/hooks";


export default function AddProductModal() {
    const dispatch = useAppDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [preview, setPreview] = useState('')
    const schema = zod.object({
        'name': zod.string().min(3, 'min 3 characters'),
        'code': zod.string().min(3, 'min 3 characters'),
        'price': zod.coerce.number().min(0, 'Price must be greater than or equal to 0'),
        'stock': zod.coerce.number().max(1000, 'Stock must be less than or equal to 1000'),
        'image': zod.string().url('Please upload a valid image')
    })

    const { register, handleSubmit, formState: { errors }, control, setValue, reset, setError } = useForm({
        'defaultValues': {
            'name': '',
            'code': '',
            'price': 0,
            'stock': 0,
            'image': ''
        },
        mode: 'onSubmit',
        resolver: zodResolver(schema)
    });
    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        if (!file.type.includes('image')) {
            setError('image', { type: 'manual', message: 'Please upload an image file' })
            return null;
        }
        else if (file.size > 1024 * 1024 * 5) {
            setError('image', { type: 'manual', message: 'Image size must be less than 5MB' })
            return null;
        } else {
            formData.append('image', file);
            setError('image', { type: 'manual', message: '' })
        }

        const res = await fetch('/api/upload-image', {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) {
            toast.error('Image upload failed')
            return null;
        }
        const data = await res.json();
        return data.url;
    };

    const handleAddProduct = async (values: zod.infer<typeof schema>) => {
        if (!values.image) {
            toast.error('Please upload an image before saving')
            return;
        }
        const response = await createProduct(values);

        if (response) {
            toast.success('Product added successfully');
            dispatch(getAllProducts())
            setOpenModal(false);
            reset()
            setPreview('')
        } else {
            toast.error('Product addition failed');
        }
    }

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Add a new product to the inventory.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <div className=" ">
                            <span className="size-40 block rounded-full overflow-hidden bg-white border-2">
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Image
                                            src={preview || '/placeholder.svg'}
                                            alt="Product"
                                            className="w-full h-full object-cover"
                                            width={100}
                                            height={100}
                                        />
                                    )}
                                />
                            </span>
                        </div>
                        <div className="">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const uploadedUrl = await handleImageUpload(file);
                                    if (uploadedUrl) {
                                        setValue("image", uploadedUrl);
                                        setPreview(uploadedUrl);
                                    } else {
                                        toast.error("Failed to upload image");
                                    }
                                }}
                            />
                            {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
                        </div>
                        <div className="grid gap-3 ">
                            <label className="text-sm font-semibold" htmlFor="name-1">Name</label>
                            <Input type="text" placeholder="Pizza" id="name-1"{...register('name')} />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <label className="text-sm font-semibold" htmlFor="code-1">Code</label>
                            <Input type='text' placeholder="P001" id="code-1"{...register('code')} />
                            {errors.code && <span className="text-red-500 text-xs">{errors.code.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <label className="text-sm font-semibold" htmlFor="price-1">Price (EGY)</label>
                            <Input type="number" placeholder="100" id="price-1"{...register('price')} />
                            {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <label className="text-sm font-semibold" htmlFor="stock-1">Stock</label>
                            <Input type='number' placeholder="10" id="stock-1"{...register('stock')} />
                            {errors.stock && <span className="text-red-500 text-xs">{errors.stock.message}</span>}
                        </div>
                    </div>
                    <DialogFooter className="mt-5">
                        <DialogClose asChild>
                            <Button onClick={() => (reset(), setPreview(''))} className="bg-red-500 text-white hover:bg-red-600">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-amber-600 text-white hover:bg-amber-300">Add Product</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
