import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isSaving: false,
    messageSaved: '',
    status: '',
    users: [],
    total: 0,
    error: '',
    currentUser: {}
  },
  reducers: {
    savingNewUser: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      state.status = '';
    },
    setSavingUser: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      state.status = '';
    },
    setSavedUser: (state, action) => {
      state.isSaving = false;
      state.status = action.payload.status
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.total = action.payload.total;
      state.messageSaved = action.payload.message;
      state.error = action.payload.error;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.currentUser
    }
  }
});

export const {
  savingNewUser,
  setCurrentUser,
  setUsers,
  setSavedUser,
  setSavingUser
} = userSlice.actions;