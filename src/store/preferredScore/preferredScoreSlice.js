import { createSlice } from '@reduxjs/toolkit';

export const preferredScoreSlice = createSlice({
  name: 'preferredScore',
  initialState: {
    preferredScores: []
  },
  reducers: {
    setPreferredScores: (state, action) => {
      state.preferredScores = action.payload.preferredScores;
    }
  }
});

export const {
  setPreferredScores
} = preferredScoreSlice.actions;