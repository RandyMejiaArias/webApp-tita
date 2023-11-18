import { createSlice } from '@reduxjs/toolkit';

export const scoreCharacteristicSlice = createSlice({
  name: 'scoreCharacteristic',
  initialState: {
    isSaving: false,
    messageSaved: '',
    status: '',
    characteristics: [],
    error: '',
    currentCharacteristic: {}
  },
  reducers: {
    savingNewCharacteristic: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      state.status = '';
    },
    setSavingCharacteristic: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      state.status = '';
    },
    setSavedCharacteristic: (state, action) => {
      state.isSaving = false;
      state.status = action.payload.status
    },
    setCharacteristics: (state, action) => {
      state.characteristics = action.payload.characteristics;
      state.messageSaved = action.payload.message;
      state.error = action.payload.error;
    },
    setCurrentCharacteristic: (state, action) => {
      state.currentCharacteristic = action.payload.currentCharacteristic
    }
  }
});

export const {
  savingNewCharacteristic,
  setCurrentCharacteristic,
  setCharacteristics,
  setSavedCharacteristic,
  setSavingCharacteristic
} = scoreCharacteristicSlice.actions;