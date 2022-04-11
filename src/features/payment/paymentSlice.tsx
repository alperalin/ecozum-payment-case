import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// API
import api from '../../api';

// Interface
import {
	PaymentInterface,
	PaymentAgreementInterface,
	PaymentReduxInterface,
} from './types';

// Initial state
const initialState: PaymentReduxInterface = {
	packageIds: [],
	totalAmount: 0,
	agreement: '',
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
		paymentSetPackageIds: (state, action) => {
			const id = `${action.payload.id}`;
			const index = state.packageIds.findIndex((item) => item === id);

			// Eger id listede varsa sil
			// Yoksa ekle
			if (index >= 0) {
				state.packageIds.splice(index, 1);
			} else {
				state.packageIds.push(id);
			}
		},
		paymentSetTotalAmount: (state, action) => {
			state.totalAmount = action.payload;
		},
	},
	extraReducers(builder) {
		// Login
		builder
			.addCase(paymentGetAgreement.pending, (state, action) => {
				state.apiStatus = 'loading';
				state.apiMessage = null;
			})
			.addCase(paymentGetAgreement.fulfilled, (state, action) => {
				state.apiStatus = 'succeeded';
				state.apiMessage = null;
				state.agreement = action.payload.content;
			})
			.addCase(paymentGetAgreement.rejected, (state, action) => {
				state.apiStatus = 'idle';
				state.apiMessage = action.error.message || null;
			});
	},
});

// Thunks
const paymentGetAgreement = createAsyncThunk(
	'payment/GET_AGREEMENT',
	async () =>
		await api
			.get<PaymentAgreementInterface>('/api/payment')
			.then((response) => response.data)
);

// Export actions
const {
	paymentClearStatus,
	paymentResetState,
	paymentSetTotalAmount,
	paymentSetPackageIds,
} = paymentSlice.actions;

// Exports
export {
	paymentClearStatus,
	paymentResetState,
	paymentGetAgreement,
	paymentSetTotalAmount,
	paymentSetPackageIds,
};

// Export Selector
export const paymentSelector = (state: RootState) => state.payment;

// Export paymentSlice Reducer as Default
export default paymentSlice.reducer;
