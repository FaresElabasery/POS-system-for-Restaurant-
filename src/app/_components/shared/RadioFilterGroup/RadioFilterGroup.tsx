'use client'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TableStatus } from "@/Interfaces/table";

export default function RadioFilterGroup({ status, setStatus }: { status: TableStatus | 'All', setStatus: (status: TableStatus | 'All') => void }) {
    return (
        <RadioGroup className="flex items-center gap-3 text-sm" defaultValue={status} onValueChange={setStatus}>
            <div className="flex items-center gap-3">
                <RadioGroupItem className="hidden" value='All' id="r1" />
                <label className={status === null ? 'active filter-btn' : 'filter-btn'} htmlFor="r1">All Tables</label>
            </div>
            <div className="flex items-center gap-3">
                <RadioGroupItem className="hidden" value="opened" id="r2" />
                <label className={status === 'opened' ? 'active filter-btn' : 'filter-btn'} htmlFor="r2">Reserved Tables</label>
            </div>
            <div className="flex items-center gap-3">
                <RadioGroupItem className="hidden" value="closed" id="r4" />
                <label className={status === 'closed' ? 'active filter-btn' : 'filter-btn'} htmlFor="r4">Closed</label>
            </div>
        </RadioGroup>
    );
}
