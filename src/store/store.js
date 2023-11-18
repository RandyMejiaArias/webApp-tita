import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { scoreCharacteristicSlice } from './scoreCharacteristic';
import { userSlice } from './user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    characteristic: scoreCharacteristicSlice.reducer,
    user: userSlice.reducer
  }
})