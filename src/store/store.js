import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { scoreCharacteristicSlice } from './scoreCharacteristic';
import { userSlice } from './user';
import { apiSlice } from './api';
import thunk from 'redux-thunk';
import { productSlice } from './product';
import { preferredScoreSlice } from './preferredScore/preferredScoreSlice';

export const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    auth: authSlice.reducer,
    characteristic: scoreCharacteristicSlice.reducer,
    preferredScores: preferredScoreSlice.reducer,
    product: productSlice.reducer,
    user: userSlice.reducer
  },
  middleware: [thunk]
});