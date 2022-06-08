import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../Features/Categories'
import productsReducer from '../Features/Products';
import ordersReducer from '../Features/Orders'
import cartReducer from '../Features/Cart'
import authReducer from '../Features/Auth'
import locationsReducer from '../Features/Locations'

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    orders: ordersReducer,
    cart: cartReducer,
    auth: authReducer,
    locations: locationsReducer
  }
})