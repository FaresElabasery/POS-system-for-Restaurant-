import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3 bg-gray-200 rounded-2xl shadow overflow-hidden">
            <div className="space-y-2 flex flex-col gap-3 p-10 ">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[100px]" />
            </div>
        </div>
    )
}
