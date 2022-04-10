import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// API
import api from '../../api';

// Interface
import { PaymentInterface, PaymentReduxInterface } from './types';

// Initial state
const initialState: PaymentReduxInterface = {
	packageIds: null,
	cardHolderName: '',
	cardNumber: '',
	expireDate: '',
	cvv: '',
	totalAmount: 0,
	apiStatus: 'idle',
	apiMessage: null,
};

// Redux slice for Payment
const paymentSlice = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		paymentResetState: (state) => {
			return { ...state, ...initialState };
		},
		paymentClearStatus: (state) => {
			state.apiStatus = 'idle';
			state.apiMessage = null;
		},
	},
	extraReducers: {
		// builder.addCase()
	},
});

// Thunks
const paymentCreate = createAsyncThunk(
	'payment/CREATE',
	async (payload: PaymentInterface) =>
		await api.post('/api/payment/', payload).then((response) => response.data)
);

// Export actions
const { paymentClearStatus, paymentResetState } = paymentSlice.actions;

// Exports
export { paymentClearStatus, paymentResetState, paymentCreate };

// Export Selector
export const paymentSelector = (state: RootState) => state.payment;

// Export paymentSlice Reducer as Default
export default paymentSlice.reducer;
