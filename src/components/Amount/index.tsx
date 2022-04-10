import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';

function Amount() {
	// Local State
	const [amount, setAmount] = useState<number>(0);

	// Redux
	// Secilen paketler redux'tan aliniyor
	const selectedPackages = useAppSelector((state) =>
		state.packages.data.filter((item) => item.selected === true)
	);

	// Tutar hesabi yapiliyor
	useEffect(() => {
		// Secilen paketlerin fiyatlari toplaniyor ve amount state'ne ataniyor
		if (selectedPackages.length > 0) {
			const packageSum = selectedPackages.reduce(
				(acc, curr, index, array) => acc + array[index].amount,
				0
			);

			setAmount(packageSum);
		} else {
			setAmount(0);
		}
	}, [selectedPackages]);

	return (
		<div>
			Secilen Paket Tutari: <strong>{amount}₺</strong>
		</div>
	);
}

export default Amount;
