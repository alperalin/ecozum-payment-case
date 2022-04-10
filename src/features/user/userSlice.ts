import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// API
import api from '../../api';

// interfaces
import { UserReduxInterface, UserInterface, LoginInterface } from './types';

// initial State
const initialState: UserReduxInterface = {
	id: null,
	fullName: '',
	email: '',
	isLoggedIn: false,
	apiStatus: 'idle',
	apiMessage: null,
};

// Redux Slice for categories
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUser: (state) => {
			return { ...state, ...initialState };
		},
		clearStatus: (state) => {
			state.apiStatus = 'idle';
			state.apiMessage = null;
			return state;
		},
	},
	extraReducers(builder) {
		// Login
		builder
			.addCase(login.pending, (state, action) => {
				state.apiStatus = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.apiStatus = 'succeeded';
				state.id = action.payload.id;
				state.fullName = action.payload.fullName;
				state.email = action.payload.email;
				state.isLoggedIn = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.apiStatus = 'idle';
				state.apiMessage = action.error.message || null;
			});
	},
});

// Thunks
// Login Endpoint
const login = createAsyncThunk(
	'user/login',
	async (payload: LoginInterface) =>
		await api
			.post<UserInterface>('/api/signup', payload)
			.then((response) => response.data)
);

// Export Actions
const { clearUser, clearStatus } = userSlice.actions;

// Exports
export { clearUser, clearStatus, login };

// Export selector
export const userSelector = (state: RootState) => state.user;

// Export userSlice Reducer as Default
export default userSlice.reducer;
