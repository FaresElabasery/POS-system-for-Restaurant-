import { SingleOrder } from "./order";

export interface Table {
    id: string;
    name: string;
    numberChair: number;
    status: TableStatus;
    orders: SingleOrder[]
}
export type TableStatus = 'closed' | 'opened' ; 
