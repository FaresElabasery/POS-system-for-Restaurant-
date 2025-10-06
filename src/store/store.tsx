import { configureStore } from "@reduxjs/toolkit";
import ordersByTableReducer from "./slices/ordersByTableSlice";
import tableReducer from "./slices/tableSlice";

export const store = configureStore({
    reducer: {
        tables: tableReducer,
        ordersByTable: ordersByTableReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
