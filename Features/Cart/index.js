import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_CART } from "../../Data/data";

const initialState = {
  value: {
    products: PRODUCTS_CART,
  },
};

const findById = (id) => {
  const element = state.value.products.find((product) => product.id === id);
  return element;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
});

export const { } = cartSlice.actions;

export default cartSlice.reducer;
