import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DDBB_URL } from "../../Constants/firebase";

const initialState = {
  value: {
    products: [],
    response: {},
    loading: false,
    error: false,
  },
};

export const confirmPurchase = createAsyncThunk(
  "cart/confirm",
  async (items, asyncThunk) => {
    try {
      const res = await fetch(`${DDBB_URL}orders.json`, {
        method: "POST",
        body: JSON.stringify({
          date: new Date().toLocaleDateString(),
          items: items,
        }),
      });
      const data = res.json();
      return data;
    } catch (error) {
      return rejectWithValue("Error: no es posible agregar el producto al carrito");
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      const productInCart = state.value.products.find(
        (producto) => producto.id === action.payload.id
      );
      if (productInCart) {
        state.value.products.map((item) => {
          if (item.id === action.payload.id) item.quantity++;
          return item;
        });
      } else {
        /*        
        const producto = PRODUCTS.find(
          (producto) => producto.id === action.payload.id
        );
        */
        state.value.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: () => {},
  },

  extraReducers: {
    [confirmPurchase.pending]: (state) => {
      state.value.loading = true;
    },
    [confirmPurchase.fulfilled]: (state, { payload }) => {
      state.value.response = payload;
      state.value.loading = false;
    },
    [confirmPurchase.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },
  },
});

export const {addItem, removeItem} = cartSlice.actions;

export default cartSlice.reducer;
