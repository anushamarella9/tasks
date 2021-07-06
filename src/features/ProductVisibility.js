import { createSlice } from '@reduxjs/toolkit'

export const ProductVisibility = createSlice({
  name: 'ProductVisibility',
  initialState: {
    value: false
  },
  reducers: {
    showProductPage: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true;
    },
    hideProductPage: state => {
      state.value = false
    }
  }
})


// Action creators are generated for each case reducer function
export const { showProductPage, hideProductPage } = ProductVisibility.actions

export default ProductVisibility.reducer