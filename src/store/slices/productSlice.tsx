import { getProducts } from "@/services/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getAllProducts = createAsyncThunk('product/getProducts', async () => {
    const data = await getProducts();
    return data.products;
})
const productSlice = createSlice({
    initialState: {
        products: [],
    },
    name: "product",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            console.log(action.payload);
        })
    }
})

export { getAllProducts };
export default productSlice.reducer;
