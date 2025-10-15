'use client'
import Image from "next/image";

import { ICategory } from "@/Interfaces/category";

export default function CheckBoxFilterCard({ category, categoryFilter, setCategoryFilter }: { category: ICategory, categoryFilter: string | null, setCategoryFilter: (name: string | null) => void }) {
    return (
        <>
            <div onClick={() => { setCategoryFilter(category.name) }} className={` flex items-center gap-3 !rounded-lg border !px-6 filter-btn group  ${categoryFilter === category.name ? 'bg-amber-400' : ''}`}>
                <Image className="group-hover:scale-130 duration-200" src={`${category.image}`} width={30} height={30} alt={category.name} />
                <div className="text-sm font-bold text-main-color">{category.name}</div>
            </div>
        </>
    )
}
