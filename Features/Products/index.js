import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DDBB_URL } from "../../Constants/firebase";

const initialState = {
  value: {
    products: [],
    productsByCategory: [],
    productSelected: null,
  },
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (asyncThunk) => {
    try {
      const res = await fetch(`${DDBB_URL}products.json`);
      const data = Object.values(await res.json());
      return data;
    } catch (error) {
      return rejectWithValue("Error: no es posible obtener las ordenes");
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProductsByCategory: (state, action) => {
      console.log("products", JSON.stringify(state.value.products));

      const productsFiltered = state.value.products.filter(
        (product) => product.category_id === action.payload
      );

      state.value.productsByCategory = productsFiltered;
    },
    setProductSelected: (state, action) => {
      const productSelected = state.value.productsByCategory.find(
        (product) => product.id === action.payload
      );
      state.value.productSelected = productSelected;
    },
  },

  extraReducers: {
    [getProducts.pending]: (state) => {
      state.value.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.products = payload;
    },
    [getProducts.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },
  },
});

export const { setProductsByCategory, setProductSelected } =
  productsSlice.actions;

export default productsSlice.reducer;
