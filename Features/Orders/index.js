import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DDBB_URL } from "@env";

const initialState = {
  value: {
    orders: [],
    loading: false,
    error: false,
    orderSelected: null,
    updateData: new Date().getTime(),
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

export const getOrdersByEmail = createAsyncThunk(
  "orders/getOrdersByEmail",
  async ({email}, asyncThunk) => {
    try {
      if(email !== null)
      {
        const ret = await fetch(`${DDBB_URL}orders.json`);
        const data = Object.values(await ret.json());

        if(data !== null)
        {
          const filter = data.filter(order => order.email === email);
          return filter;
        }
        else{
          return([]);
        }
      }
      else{
        return([]);
      }
    } catch (error) {
      console.log("getOrdersByEmail ERROR: " + error);
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

    addOrder: (state, action) => {
      state.value.orders.push(action.payload);
    },

    updateData: (state, action) => {
      state.value.updateData = new Date().getTime();
    }
  },

  extraReducers: {
    //getOrders
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

    //getOrdersByEmail
    [getOrdersByEmail.pending]: (state) => {
      state.value.loading = true;
    },
    [getOrdersByEmail.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.orders = payload;
    },
    [getOrdersByEmail.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },
  },
});

export const { setOrderSelected, addOrder, updateData } = ordersSlice.actions;

export default ordersSlice.reducer;
