'use client'
import Image from "next/image";
import { useState } from "react";

import { ICategory } from "@/Interfaces/category";

export default function CheckBoxFilterCard({ category }: { category: ICategory }) {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <>
            <div onClick={() => setIsChecked(!isChecked)} className={` flex items-start gap-3 !rounded-lg border !px-6 filter-btn  ${isChecked ? 'bg-amber-400' : ''}`}>
                <Image className="opacity-70" src={`/${category.icon}`} width={20} height={20} alt={category.name} />
                <div className="text-sm font-bold text-main-color">{category.name}</div>
            </div>
        </>
    )
}
