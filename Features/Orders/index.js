import { createSlice } from "@reduxjs/toolkit";
import { ORDERS } from "../../Data/data";

const initialState = {
    value: {
        orders: ORDERS,
        orderSelected: null,
    }
}

export const ordersSlice = createSlice({
    name: "ordres",
    initialState: initialState,
    reducers: {
        setOrderSelected: (state, action) => {
            const element = state.value.orders.find(order => order.id === action.payload);
            state.value.orderSelected = element;
        }
    }
})

export const {setOrderSelected} = ordersSlice.actions

export default ordersSlice.reducer