import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Table {
    id: number
    name: string
    status: 'opened' | 'closed'
    numberChair: number
}

interface TablesState {
    tables: Table[]
}

const initialState: TablesState = {
    tables: [
        { id: 1, name: 'Table 1', status: 'closed', numberChair: 4 },
        { id: 2, name: 'Table 2', status: 'closed', numberChair: 6 },
        { id: 3, name: 'Table 3', status: 'closed', numberChair: 2 },
        { id: 4, name: 'Table 4', status: 'closed', numberChair: 2 },
        { id: 5, name: 'Table 5', status: 'closed', numberChair: 2 },
        { id: 6, name: 'Table 6', status: 'closed', numberChair: 2 },
    ],
}

const tableSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        openTable: (state, action: PayloadAction<{ tableId: number }>) => {
            const table = state.tables.find(t => t.id === action.payload.tableId);
            if (table && table.status === "closed") {
                table.status = "opened";
            }
        },

        updateTableStatus: (state, action: PayloadAction<{ tableId: number; status: 'opened' | 'closed' }>) => {
            const table = state.tables.find(t => t.id === action.payload.tableId)
            if (table) {
                table.status = action.payload.status
            }
        },
    },
})

export const { openTable, updateTableStatus } = tableSlice.actions
export default tableSlice.reducer
