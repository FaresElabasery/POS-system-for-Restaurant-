import { OrderState } from "@/Interfaces/order";
import { IProduct } from "@/Interfaces/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: OrderState = {
    byTable: {}
}

const ordersByTableSlice = createSlice({
    name: 'ordersByTable',
    initialState,
    reducers: {
        addproductToTable(state, action: PayloadAction<{ tableId: number, product: IProduct }>) {
            const { tableId, product } = action.payload
            const tableOrder = state.byTable[tableId] ?? {
                id: tableId,
                items: [],
                status: 'opened',
                createdAt: new Date().toISOString(),
            }
            const existing = tableOrder.items.find(item => item.id === product.id)
            if (existing && existing.stock > existing.count) {
                existing.count += 1
            } else if (existing && existing.stock <= existing.count) {
                return
            } else {
                tableOrder.items.push({ ...product, count: 1 })
            }
            state.byTable[tableId] = tableOrder
        },
        removeProductFromTable(state, action: PayloadAction<{ tableId: number, productId: number }>) {
            const { tableId, productId } = action.payload
            const tableOrder = state.byTable[tableId]
            if (!tableOrder) return
            tableOrder.items = tableOrder.items.filter(item => item.id !== productId)
            state.byTable[tableId] = tableOrder
        },
        decreaseProductCount(state, action: PayloadAction<{ tableId: number, productId: number }>) {
            const { productId, tableId } = action.payload
            const tableOrder = state.byTable[tableId]
            if (!tableOrder) return
            const existing = tableOrder.items.find(item => item.id === productId)
            if (!existing) return
            if (existing.count > 1) {
                existing.count -= 1
            }
            state.byTable[tableId] = tableOrder
        },
        clearOrderFromTable(state, action: PayloadAction<{ tableId: number }>) {
            const { tableId } = action.payload
            state.byTable[tableId] = {
                id: tableId,
                items: [],
                status: 'closed',
                createdAt: new Date().toISOString(),
            }
        },
        completeOrderForTable(state, action: PayloadAction<{ tableId: number }>) {
            const { tableId } = action.payload
            const tableOrder = state.byTable[tableId]
            if (!tableOrder) return
            tableOrder.status = 'closed'
            state.byTable[tableId] = tableOrder
        },
        deleteOrderEntry(state, action: PayloadAction<number>) {
            delete state.byTable[action.payload];
        }
    }
})
export const { addproductToTable, removeProductFromTable, decreaseProductCount, clearOrderFromTable, completeOrderForTable, deleteOrderEntry } = ordersByTableSlice.actions
export default ordersByTableSlice.reducer
