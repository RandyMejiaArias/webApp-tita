import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    total: 0,
    currentProduct: {}
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total
    },
    addFetchedProducts: (state, action) => {
      state.products = { ...state.products , ...action.payload.products};
      state.total += action.payload.total
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload.currentProduct
    }
  }
});

export const {
  addFetchedProducts,
  setCurrentProduct,
  setProducts
} = productSlice.actions;