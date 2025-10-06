export interface Table {
    id: number;
    name: string;
    numberChair: number;
    status: TableStatus;
}
export type TableStatus = 'closed' | 'opened' ;
