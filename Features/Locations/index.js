import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMapUrl, getreverseGeoCodeUrl } from "../../Constants/mapquest";

const initialState = {
  value: {
    locations: [],
    loading: false,
    error: false,
    locationSelected: null,
    mapUrl: null,
    address: null,
  },
};

export const getMap = createAsyncThunk(
  "locations/getMap",
  async ({ location }, asyncThunk) => {
    try {
      const url = getMapUrl + location.lat + "," + location.lng;

      console.log("getMap() -> URL: " + url);

      return url;
    } catch (error) {
      console.log("getMap ERROR: " + error);
      return rejectWithValue("Error: no es posible obtener las ubicaciones");
    }
  }
);

export const getReverseGeoCodeUrl = createAsyncThunk(
  "locations/getReverseGeoCodeUrl",
  async ({ location }, asyncThunk) => {
    try {
      const url = getreverseGeoCodeUrl + location.lat + "," + location.lng;
      const ret = await fetch(url);

      const data = Object.values(await ret.json());
      const arr0 = data[0];
      const arr1 = data[1];
      const arr2 = data[2];
      const locs = arr2[0];
      const loc1 = locs.locations[0];
      const street = loc1.street;

      return street;
    } catch (error) {
      console.log("getReverseGeoCodeUrl ERROR: " + error);
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

    addLocation: (state, { payload }) => {
      state.value.locations.push(payload);
    },
  },

  extraReducers: {
    //getMap
    [getMap.pending]: (state) => {
      state.value.loading = true;
    },
    [getMap.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.mapUrl = payload;
    },
    [getMap.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },

    //getReverseGeoCodeUrl
    [getReverseGeoCodeUrl.pending]: (state) => {
      state.value.loading = true;
    },
    [getReverseGeoCodeUrl.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.address = payload;
    },
    [getReverseGeoCodeUrl.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },
  },
});

export const { setLocationSelected, addLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
