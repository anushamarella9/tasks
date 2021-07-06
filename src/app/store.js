import { configureStore } from '@reduxjs/toolkit';
import ProductVisibilityReducer from '../features/ProductVisibility';
import DivisionVisibilityReducer from '../features/DivisionVisibility';

export default configureStore({
  reducer: {
    product: ProductVisibilityReducer,
    division: DivisionVisibilityReducer
  },
})