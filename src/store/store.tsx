import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/ordersSlice";
import tableReducer from "./slices/tableSlice";
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
    reducer: {
        tables: tableReducer,
        orders: ordersReducer,
        products: productReducer,
        category: categoryReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
