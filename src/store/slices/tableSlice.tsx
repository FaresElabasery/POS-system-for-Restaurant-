import { ITable } from '@/Interfaces/table'
import { getTables } from '@/services/table'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


interface TablesState {
    tables: ITable[]
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTables.fulfilled, (state, action) => {
            state.tables = action.payload
        })
    }
})

export default tableSlice.reducer
export { getAllTables }
