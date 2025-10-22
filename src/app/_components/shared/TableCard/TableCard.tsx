'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ITable } from "@/Interfaces/table";
import { DeleteTable } from "@/services/table";
import { useAppDispatch } from "@/store/hooks";
import { getAllTables } from "@/store/slices/tableSlice";
import { Trash, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function TableCard({ item, from }: { item: ITable, from?: 'table' | 'order' }) {
    const dispatch = useAppDispatch()
    const handleDeleteTable = async () => {
        const res = await DeleteTable(item.id)
        if (res.message === 'Table deleted successfully') {
            toast.success(res.message)
            dispatch(getAllTables())
        } else {
            toast.error(res.error)
        }
    }
    return (
        <div className="relative overflow-hidden h-fit">
            {from === 'table' && (
                <Dialog >
                    <DialogTrigger>
                        <span className="absolute z-10 bottom-0 -right-10 hover:right-0 duration-200 text-xs text-white font-medium bg-red-500 flex items-center p-1 hover:bg-red-600  rounded-s-2xl gap-1 cursor-pointer "><Trash className="size-4" /> Delete</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Product</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete the product
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline" className="cursor-pointer w-1/2">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant="destructive" className="cursor-pointer w-1/2" onClick={handleDeleteTable}>Delete</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
            <Link href={`/table/${item.id}`} className={` block relative h-43 p-2 rounded-md shadow overflow-hidden ${item.status === 'opened' ? 'bg-green-400' : item.status === 'closed' ? 'bg-orange-400' : 'bg-yellow-400'}`}>
                <div className="text-sm flex flex-col gap-2 font-bold  absolute bottom-2 left-2 z-2">
                    <span className="text-sm font-bold text-white"> {item.name}</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1"><User size={20} /> {item.numberChair}</span>
                </div>
                <span className={`w-2 h-2 rounded-full absolute top-2 right-2 ${item.status === 'opened' ? 'bg-green-600' : item.status === 'closed' ? 'bg-orange-600' : 'bg-yellow-600'}`}></span>
                <div className="p-2 flex flex-wrap gap-2 justify-center items-center">
                    {Array.from({ length: item.numberChair }).map((_, index) => (
                        <span key={index} className="text-xs size-10 shadow bg-gray-200 rounded-full font-bold text-center flex-center">{index + 1}</span>
                    ))}
                </div>
            </Link>
        </div>
    )
}
