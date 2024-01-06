import { createSlice } from '@reduxjs/toolkit';

export const apiPreferredScoreSlice = createSlice({
	name: 'apiPreferredScore',
	initialState: {
		data: null,
		loading: false,
		error: null
	},
	reducers: {
		fetchDataStart(state) {
			state.data = null;
			state.loading = true;
			state.error = null;
		},
		fetchDataSuccess(state, action) {
			state.loading = false;
			state.data = action.payload;
		},
		fetchDataFailure(state, action) {
			state.data = null;
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchDataFailure,
	fetchDataStart,
	fetchDataSuccess
} = apiPreferredScoreSlice.actions;