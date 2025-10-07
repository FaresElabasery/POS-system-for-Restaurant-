import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AddProductModal() {
    const 

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                    Add a new product to the inventory.
                </DialogDescription>
            </DialogHeader>
            <form action="">
                <div className="grid grid-cols-2 gap-4 items-center">
                    <div className=" ">
                        <span className="size-40 block rounded-2xl bg-white border ">
                            
                        </span>
                    </div>
                    <div className="">
                        <Input type="file" id="image-1" name="image" />
                    </div>
                    <div className="grid gap-3 ">
                        <label className="text-sm font-semibold" htmlFor="name-1">Name</label>
                        <Input type="text" id="name-1" name="name" defaultValue="Pizza" />
                    </div>
                    <div className="grid gap-3">
                        <label className="text-sm font-semibold" htmlFor="code-1">Code</label>
                        <Input type='text' id="code-1" name="code" defaultValue="P001" />
                    </div>
                    <div className="grid gap-3">
                        <label className="text-sm font-semibold" htmlFor="price-1">Price (EGY)</label>
                        <Input type="number" id="price-1" name="price" defaultValue="100" />
                    </div>
                    <div className="grid gap-3">
                        <label className="text-sm font-semibold" htmlFor="stock-1">Stock</label>
                        <Input type='number' id="stock-1" name="stock" defaultValue="@peduarte" />
                    </div>
                </div>
                <DialogFooter className="mt-5">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </DialogContent>)
}
