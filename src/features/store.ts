import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import packagesReducer from './packages/packagesSlice';
import paymentReducer from './payment/paymentSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		packages: packagesReducer,
		payment: paymentReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
