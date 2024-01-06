import { createSlice } from '@reduxjs/toolkit';

export const sizeSlice = createSlice({
  name: 'size',
  initialState: {
    sizes: [],
    total: 0
  },
  reducers: {
    setSizes: (state, action) => {
      state.sizes = action.payload.sizes;
      state.total = action.payload.total
    }
  }
});

export const {
  setSizes
} = sizeSlice.actions;