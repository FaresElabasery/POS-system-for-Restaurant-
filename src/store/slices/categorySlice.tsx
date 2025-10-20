import { ICategory } from '@/Interfaces/category'
import { getCategories } from '@/services/categoreis'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getCategory = createAsyncThunk(
    'category/getCategory',
    async () => {
        const res = await getCategories()
        return res
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [] as ICategory[],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to get category'
            })
    },
})

export default categorySlice.reducer
export { getCategory }

