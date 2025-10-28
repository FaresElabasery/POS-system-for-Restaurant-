'use client'
import { createCategory } from "@/app/category/category.actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from 'zod';


export default function AddCategoryModal() {
    const [openModal, setOpenModal] = useState(false)
    const [preview, setPreview] = useState('')
    const schema = zod.object({
        'name': zod.string().min(3, 'min 3 characters'),
        'image': zod.string().url('Please upload a valid image'),
    })

    const { register, handleSubmit, formState: { errors }, control, setValue, reset, setError } = useForm({
        'defaultValues': {
            'name': '',
            'image': '',
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

     const handleAddCategory = async (values: zod.infer<typeof schema>) => {
        if (!values.image) {
            toast.error('Please upload an image before saving')
            return;
        }
        const response = await createCategory(values);

        if (response) {
            toast.success('Category added successfully');
            setOpenModal(false);
            reset()
            setPreview('')
        } else {
            toast.error('Category addition failed');
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
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                        Add a new category to the inventory.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleAddCategory)}>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <div className=" ">
                            <span className="size-40 block rounded-full overflow-hidden bg-white border-2">
                                <Controller
                                    name="image"
                                    control={control}
                                    render={() => (
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
                        <div className="grid gap-3 col-span-2">
                            <label className="text-sm font-semibold" htmlFor="name-1">Name</label>
                            <Input type="text" placeholder="Chicken Or Beaf ..." id="name-1"{...register('name')} />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                        </div>
                    </div>
                    <DialogFooter className="mt-5">
                        <DialogClose asChild>
                            <Button onClick={() => (reset(), setPreview(''))} className="bg-red-500 text-white hover:bg-red-600">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-amber-600 text-white hover:bg-amber-300">Add Category</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
