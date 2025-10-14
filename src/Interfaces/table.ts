
export interface ITable {
    id: string
    name: string
    numberChair: number
    status: TableStatus
}
export type TableStatus = 'closed' | 'opened'; 
