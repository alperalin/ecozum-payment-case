import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	createSelector,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';

// API
import api from '../../api';

// Interfaces
import { PackagesInterface, PackagesReduxInterface } from './types';

// initial State
const initialState: PackagesReduxInterface = {
	data: [],
	apiStatus: 'idle',
	apiMessage: null,
};

// Redux Slice for Packages
const packagesSlice = createSlice({
	name: 'packages',
	initialState,
	reducers: {
		packagesResetState: (state) => {
			return { ...state, ...initialState };
		},
		packagesClearStatus: (state) => {
			state.apiStatus = 'idle';
			state.apiMessage = null;
		},
		packagesToggle: (state, action: PayloadAction<any>) => {
			const { id } = action.payload;
			const index = state.data.findIndex((item) => item.id === id);

			state.data[index].selected = !state.data[index].selected;

			// state.data = [
			// 	...state.data.slice(0, index),
			// 	{ ...action.payload, selected: !action.payload.selected },
			// 	...state.data.slice(index + 1),
			// ];
		},
	},
	extraReducers(builder) {
		builder
			.addCase(packagesFetchAll.pending, (state, action) => {
				state.apiStatus = 'loading';
			})
			.addCase(
				packagesFetchAll.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.apiStatus = 'succeeded';
					state.data = [...action.payload];
				}
			)
			.addCase(packagesFetchAll.rejected, (state, action) => {
				state.apiStatus = 'idle';
				state.apiMessage = action.error.message || null;
			});
	},
});

// Thunks
// fetchAll
const packagesFetchAll = createAsyncThunk(
	'packages/FETCH_ALL',
	async () =>
		await api
			.get<PackagesInterface[]>('/api/packages')
			.then((response) => response.data)
);

// Export Actions
const { packagesClearStatus, packagesResetState, packagesToggle } =
	packagesSlice.actions;

// Exports
export {
	packagesClearStatus,
	packagesResetState,
	packagesToggle,
	packagesFetchAll,
};

// Export selector
export const packagesSelector = (state: RootState) => state.packages;

// Export packagesSlice Reducer as Default
export default packagesSlice.reducer;
