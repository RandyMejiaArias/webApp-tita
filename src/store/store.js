import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { userSlice } from './user';
import { apiUsersSlice } from './api';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    apiUsers: apiUsersSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer
  },
  middleware: [thunk]
});