import { getTables } from '@/services/table'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Table {
    id: number
    name: string
    status: 'opened' | 'closed'
    numberChair: number
}

interface TablesState {
    tables: Table[]
}
const getAllTables = createAsyncThunk('tables/getAllTables', async () => {
    const res = await getTables()
    return res.tables
})

const initialState: TablesState = {
    tables: [],
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
    extraReducers: (builder) => {
        builder.addCase(getAllTables.fulfilled, (state, action) => {
            state.tables = action.payload
        })
    }
})

export const { openTable, updateTableStatus } = tableSlice.actions
export default tableSlice.reducer
export { getAllTables }
