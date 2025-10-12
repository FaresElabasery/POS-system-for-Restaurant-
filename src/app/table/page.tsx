'use client'
import { TableStatus } from "@/Interfaces/table"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getAllTables } from "@/store/slices/tableSlice"
import { useEffect, useState } from "react"
import RadioGroup from "../_components/shared/RadioFilterGroup/RadioFilterGroup"
import TableCard from "../_components/shared/TableCard/TableCard"
import AddTableModal from "../_components/shared/AddTableModal/AddTableModal"

export default function Table() {
    const tables = useAppSelector(state => state.tables.tables) || []
    const dispatch = useAppDispatch()
    const [status, setStatus] = useState<TableStatus | 'All'>('All')

    const displayFilterTable = () => {
        const filterTables = tables?.slice()
        if (status === 'closed') {
            return filterTables.filter((item) => item.status === 'closed')
        }
        if (status === 'opened') {
            return filterTables.filter((item) => item.status === 'opened')
        }
        return filterTables
    }
    console.log(displayFilterTable());
    console.log(tables);

    useEffect(() => {
        dispatch(getAllTables())
    }, [dispatch])

    return (
        <div className="bg-white mt-5">
            <div className="container">
                <div className='title my-5 flex-center gap-2'>
                    <h1 className='text-5xl font-bold text-center'>All Tables</h1>
                    <AddTableModal />
                </div>
                <div className="filter flex flex-col gap-4 md:flex-row justify-between items-center shadow-2xl mb-5 rounded-2xl p-4 w-10/12 mx-auto">
                    <div className="text-2xl font-bold ">
                        <RadioGroup status={status} setStatus={setStatus} />
                    </div>
                    <div className="flex gap-5">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-400 shadow"></div>
                            <div className="text-sm font-bold text-main-color">Open</div>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-orange-400 shadow"></div>
                            <div className="text-sm font-bold text-main-color">Closed</div>
                        </div>
                    </div>
                </div>
                <div className="content grid sm:grid-cols-2 md:grid-cols-3 gap-5 bg-gray-100 rounded-2xl p-4 shadow min-h-110">
                    {
                        displayFilterTable()?.map((item) => (
                            <TableCard key={item.id} item={item} from="table" />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
