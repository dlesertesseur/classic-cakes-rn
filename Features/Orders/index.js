import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DDBB_URL } from "../../Constants/firebase";

const initialState = {
  value: {
    orders: [],
    loading: false,
    error: false,
    orderSelected: null,
  },
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (asyncThunk) => {
    try {
      const res = await fetch(`${DDBB_URL}orders.json`);
      const data = Object.values(await res.json());
      return data;
    } catch (error) {
      return rejectWithValue("Error: no es posible obtener las ordenes");
    }
  }
);

export const ordersSlice = createSlice({
  name: "ordres",
  initialState: initialState,
  reducers: {
    setOrderSelected: (state, action) => {
      const element = state.value.orders.find(
        (order) => order.id === action.payload
      );
      state.value.orderSelected = element;
    },
  },

  extraReducers: {
    [getOrders.pending]: (state) => {
      state.value.loading = true;
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.orders = payload;
    },
    [getOrders.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },
  },
});

export const { setOrderSelected } = ordersSlice.actions;

export default ordersSlice.reducer;
