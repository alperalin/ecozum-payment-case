// Imports
import { useEffect } from 'react';
import { paymentSetTotalAmount } from '../../features/payment/paymentSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

// Styles
import './style.scss';

// Element
function Amount() {
	// Redux
	const { totalAmount } = useAppSelector((state) => state.payment);
	// Secilen paketler redux'tan aliniyor
	const selectedPackages = useAppSelector((state) =>
		state.packages.data.filter((item) => item.selected === true)
	);
	const dispatch = useAppDispatch();

	// Tutar hesabi yapiliyor
	useEffect(() => {
		let packageSum = 0;
		// Secilen paketlerin fiyatlari toplaniyor ve amount state'ne ataniyor
		if (selectedPackages.length > 0) {
			packageSum = selectedPackages.reduce(
				(acc, curr, index, array) => acc + array[index].amount,
				0
			);
		}
		dispatch(paymentSetTotalAmount(packageSum));
	}, [selectedPackages]);

	return (
		<div className="amount">
			Toplam Tutar: <strong>{totalAmount}₺</strong>
		</div>
	);
}

export default Amount;
