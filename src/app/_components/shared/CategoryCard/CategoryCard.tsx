'use client'
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch } from '@/store/hooks';
import placeholder from '@images/placeholder.svg';
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { ICategory } from "@/Interfaces/category";
import { deleteCategory } from "@/app/category/category.actions";
import { toast } from "sonner";

export default function CategoryCard({ category }: { category: ICategory }) {
    const dispatch = useAppDispatch()

    const handleDeleteCategory = async () => {
        const res = await deleteCategory({ id: category.id })
        if (res.message) {
            toast.success(res.message, {
                position: 'top-right'
            })
        }
        else {
            toast.error(res.error, {
                position: 'top-right'
            })
        }
    }

    return (
        <div className="bg-gray-100 size-40 flex-center hover:bg-gray-200 duration-200 active:scale-105 group rounded-2xl shadow-md relative overflow-hidden w-full sm:mx-auto">
            <Dialog >
                <DialogTrigger>
                    <button className="absolute bottom-0 z-10 -right-10 hover:right-0 duration-200 text-xs text-white font-medium bg-red-500 flex items-center p-1 hover:bg-red-600  rounded-s-2xl gap-1 cursor-pointer "><Trash className="size-4" /> Delete</button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the category
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end">
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="destructive" onClick={handleDeleteCategory} className="cursor-pointer" >Delete</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col justify-between absolute ">
                <div className="flex justify-between my-1">
                    <Image src={category.image || placeholder} alt={category.name} width={120} height={120} className="rounded-full object-contain " />
                </div>
            </div>
            <div className="absolute inset-0 bg-orange-400/70 flex-center translate-y-[-100%] group-hover:translate-y-[0%] z-5 duration-200">
                <h1 className="text-white font-bold text-2xl  duration-200">{category.name}</h1>
            </div>
        </div>
    )
}
