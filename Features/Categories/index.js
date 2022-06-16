import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DDBB_URL } from "../../Constants/firebase";
//import { CATEGORIES } from "../../Data/data";

const initialState = {
  value: {
    categories: [],
    categorySelected: null,
  },
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (asyncThunk) => {
    try {
      const res = await fetch(`${DDBB_URL}categories.json`);
      const data = Object.values(await res.json());

      return data;
    } catch (error) {
      return rejectWithValue("Error: no es posible obtener las categorias");
    }
  }
)

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    selectCategory: (state, action) => {
      const categorySelected = state.value.categories.find(
        (category) => category.id === action.payload
      );
      state.value.categorySelected = categorySelected;
    },
  },

  extraReducers: {
    //getCategories
    [getCategories.pending]: (state) => {
      state.value.loading = true;
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.categories = payload;
    },
    [getCategories.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },
  },
});

export const { selectCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
