import { Table } from "@/Interfaces/table";
import { User } from "lucide-react";
import Link from "next/link";

export default function TableCard({item}:{item:Table}) {
    return (
        <Link href={`/table/${item.id}`} className={`p-4 block relative h-40  rounded-md shadow ${item.status === 'opened' ? 'bg-green-400' : item.status === 'closed' ? 'bg-orange-400' : 'bg-yellow-400'}`}>
            <div className="text-sm flex flex-col gap-2 font-bold  absolute bottom-2 z-2">
                <span className="text-sm font-bold text-white"> {item.name}</span>
                <span className="text-sm font-bold text-white flex items-center gap-1"><User size={20} /> {item.numberChair}</span>
            </div>
            <span className={`w-2 h-2 rounded-full absolute top-2 right-2 ${item.status === 'opened' ? 'bg-green-600' : item.status === 'closed' ? 'bg-orange-600' : 'bg-yellow-600'}`}></span>
            <div className="p-2 flex flex-wrap gap-2 justify-center items-center">
                {Array.from({ length: item.numberChair }).map((_, index) => (
                    <span key={index} className="text-xs size-10 shadow bg-gray-200 rounded-full font-bold text-center flex-center">{index + 1}</span>
                ))
                }
            </div>
        </Link>
    )
}
