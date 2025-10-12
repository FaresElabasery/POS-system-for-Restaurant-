'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AddTable } from "@/services/table";
import { useAppDispatch } from "@/store/hooks";
import { getAllTables } from "@/store/slices/tableSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from 'zod';


export default function AddTableModal() {
    const dispatch = useAppDispatch()
    const [openModal, setOpenModal] = useState(false)
    const schema = zod.object({
        'name': zod.string().min(3, 'min 3 characters'),
        'numberChair': zod.coerce.number().refine((val) => val > 0, 'Number of chairs must be greater than 0').refine((val) => val < 16, 'Number of chairs must be less than 16'),
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        'defaultValues': {
            'name': '',
            'numberChair': 0
        },
        mode: 'onSubmit',
        resolver: zodResolver(schema)
    });


    const handleAddProduct = async (values: zod.infer<typeof schema>) => {
        const response = await AddTable(values);

        if (response) {
            toast.success('Table added successfully');
            dispatch(getAllTables())
            setOpenModal(false);
            reset()
        } else {
            toast.error('Table addition failed');
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
                    <p>Add New Table</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Table</DialogTitle>
                    <DialogDescription>
                        Add a new Table to your Resturant.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="grid grid-cols-2 gap-4 ">

                        <div className="grid gap-3 ">
                            <label className="text-sm font-semibold" htmlFor="name-1">Name</label>
                            <Input type="text" placeholder="table name" id="name-1"{...register('name')} />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                        </div>
                        <div className="grid gap-3">
                            <label className="text-sm font-semibold" htmlFor="numberChair-1">Number of Chairs</label>
                            <Input type='number' placeholder="5" id="numberChair-1"{...register('numberChair')} />
                            {errors.numberChair && <span className="text-red-500 text-xs">{errors.numberChair.message}</span>}
                        </div>
                    </div>
                    <DialogFooter className="mt-5">
                        <DialogClose asChild>
                            <Button onClick={() => (reset())} className="bg-red-500 text-white hover:bg-red-600">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-amber-600 text-white hover:bg-amber-300">Add Table</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
