import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DDBB_URL } from "@env";

const initialState = {
  value: {
    products: [],
    response: {},
    loading: false,
    error: false,
    total: 0,
  },
};

const calculateTotal = (products) => {
  let total = 0; 
  products.map(product => (total += (product.price * product.quantity)));
  return(total);
}

export const confirmPurchase = createAsyncThunk(
  "cart/confirm",
  async ({orderId, email, items, address}, asyncThunk) => {

    const order = {
      id: orderId,
      email: email,
      date: new Date().toLocaleDateString(),
      items: items,
      address: address,
      state: "PENDIENTE",
      total: calculateTotal(items)
    };

    try {
      const body = JSON.stringify(order);

      const res = await fetch(`${DDBB_URL}orders.json`, {
        method: "POST",
        body: body,
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
        state.value.products.push({...action.payload, quantity: 1 });
      }
      state.value.total = calculateTotal(state.value.products);
    },
    
    removeItem: (state, action) => {
      const filteredItems = state.value.products.filter(item => item.id !== action.payload.id);
      state.value.products = filteredItems;
      state.value.total = calculateTotal(state.value.products);
    },

    clearData: (state, action) => {
      state.value.products = [];
      state.value.total = 0;
    },
  },

  extraReducers: {
    [confirmPurchase.pending]: (state) => {
      state.value.loading = true;
    },

    [confirmPurchase.fulfilled]: (state, {payload}) => {
      state.value.response = payload;
      state.value.loading = false;
    },

    [confirmPurchase.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
      state.value.createdOrder = null;
    },
  },
});

export const {addItem, removeItem, clearData} = cartSlice.actions;

export default cartSlice.reducer;
