import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../Features/Categories'
import productsReducer from '../Features/Products';

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  }
})