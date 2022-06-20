import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMapUrl, getreverseGeoCodeUrl } from "@env";
import { deleteAddress, fetchAddress, insertAddress } from "../../DDBB";

const initialState = {
  value: {
    locations: [],
    loading: false,
    error: false,
    locationSelected: null,
    mapUrl: null,
    address: null,
    responseDb: null,
    reload: null,
  },
};

export const addLocationDb = createAsyncThunk(
  "location/addLocationDb",
  async (location, asyncThunk) => {
    try {
      const result = await insertAddress(
        location.title,
        location.id,
        location.picture,
        location.address
      );
      return `Record succesfully row with id: ${result.insertId}`;
    } catch (error) {
      console.log(error.message);
      return asyncThunk.rejectWithValue("Error at writing address on db");
    }
  }
);

export const removeLocationDb = createAsyncThunk(
  "location/removeLocationDb",
  async (location, asyncThunk) => {
    try {
      const result = await deleteAddress(location.id);

      return `Item with id: ${location.id} removed successfully`;
    } catch (error) {
      console.log(error.message);
      return asyncThunk.rejectWithValue(
        `Error at remove item with id: ${location.id}`
      );
    }
  }
);

export const getLocations = createAsyncThunk(
  "location/getLocations",
  async (_, asyncThunk) => {
    try {
      const result = await fetchAddress();
      const data = result.rows._array;
      return data;
    } catch (error) {
      return asyncThunk.rejectWithValue("Error at fetching addresses on db");
    }
  }
);

export const getMap = createAsyncThunk(
  "locations/getMap",
  async ({ location }, asyncThunk) => {
    try {
      const url = getMapUrl + location.lat + "," + location.lng;

      //console.log("getMap() -> URL: " + url);

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

      //console.log("getReverseGeoCodeUrl() -> " + url);

      const arr0 = data[0];
      const arr1 = data[1];
      const arr2 = data[2];
      const locs = arr2[0];
      const loc1 = locs.locations[0];

      const street = loc1.street;
      const country = loc1.adminArea1;
      const province = loc1.adminArea3;
      const city = loc1.adminArea5;

      const address = street + ", " + (province !== city ? (city + " " + province) : city);

      return address;
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
      state.value.address = null;
      addLocationDb(payload);
    },

    removeLocation: (state, { payload }) => {
      state.value.locations = state.value.locations.filter(
        (location) => location.id !== payload.id
      );
    },
    resetLocationData: (state, { payload }) => {initialState},
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

    //addLocationDb
    [addLocationDb.pending]: (state) => {
      state.value.loading = true;
    },
    [addLocationDb.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = null;
    },
    [addLocationDb.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = payload;
    },

    //getLocations
    [getLocations.pending]: (state) => {
      state.value.loading = true;
    },
    [getLocations.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = null;
      state.value.locations = payload;
    },
    [getLocations.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = payload;
    },

    //removeLocationDb
    [removeLocationDb.pending]: (state) => {
      state.value.loading = true;
    },
    [removeLocationDb.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = null;
      state.value.responseDb = payload;
    },
    [removeLocationDb.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = payload;
    },
  },
});

export const { setLocationSelected, addLocation, resetLocationData, removeLocation } =
  locationsSlice.actions;

export default locationsSlice.reducer;
