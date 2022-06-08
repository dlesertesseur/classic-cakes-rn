import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DDBB_URL } from "../../Constants/firebase";

const initialState = {
  value: {
    locations: [],
    loading: false,
    error: false,
    locationSelected: null,
  },
};

export const getLocationsByEmail = createAsyncThunk(
  "locations/getLocationsByEmail",
  async ({email}, asyncThunk) => {
    try {
      const ret = await fetch(`${DDBB_URL}locations.json`);
      const data = Object.values(await ret.json());
      const filter = data.filter(location => location.email === email);
      return filter;
    } catch (error) {
      console.log("getLocationsByEmail ERROR: " + error);
      return rejectWithValue("Error: no es posible obtener las ubicaciones");
    }
  }
);

export const locationsSlice = createSlice({
  name: "locations",
  initialState: initialState,
  reducers: {
    setLocationSelected: (state, action) => {
      const element = state.value.orders.find(
        (location) => location.id === action.payload
      );
      state.value.locationSelected = element;
    },
  },

  extraReducers: {
    //getLocationsByEmail
    [getLocationsByEmail.pending]: (state) => {
      state.value.loading = true;
    },
    [getLocationsByEmail.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.locations = payload;
    },
    [getLocationsByEmail.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },
  },
});

export const { setLocationSelected } = locationsSlice.actions;

export default locationsSlice.reducer;
