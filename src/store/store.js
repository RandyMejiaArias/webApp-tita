import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { scoreCharacteristicSlice } from './scoreCharacteristic';
import { userSlice } from './user';
import { apiPreferredScoreSlice, apiProductsSlice, apiScoreCharacteristicsSlice, apiSizesSlice, apiUsersSlice } from './api';
import thunk from 'redux-thunk';
import { productSlice } from './product';
import { sizeSlice } from './size';
import { preferredScoreSlice } from './preferredScore';


export const store = configureStore({
  reducer: {
    apiPreferredScores: apiPreferredScoreSlice.reducer,
    apiProducts: apiProductsSlice.reducer,
    apiScoreCharacteristics: apiScoreCharacteristicsSlice.reducer,
    apiSizes: apiSizesSlice.reducer,
    apiUsers: apiUsersSlice.reducer,
    auth: authSlice.reducer,
    characteristic: scoreCharacteristicSlice.reducer,
    preferredScores: preferredScoreSlice.reducer,
    product: productSlice.reducer,
    size: sizeSlice.reducer,
    user: userSlice.reducer
  },
  middleware: [thunk]
});