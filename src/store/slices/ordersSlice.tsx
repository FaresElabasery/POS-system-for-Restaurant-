import { IOrder } from '@/Interfaces/order'
import { getTableOrder } from '@/services/table'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const getOrder = createAsyncThunk(
    'order/getOrder',
    async (tableId: string) => {
        const res = await getTableOrder(tableId)
        return res
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        data: {} as IOrder,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to get order'
            })
    },
})

export default orderSlice.reducer
export { getOrder }

