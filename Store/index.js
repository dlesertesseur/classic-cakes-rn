import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../Features/Categories'
import productsReducer from '../Features/Products';
import ordersReducer from '../Features/Orders'
import cartReducer from '../Features/Cart'

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    orders: ordersReducer,
    cart: cartReducer,
  }
})