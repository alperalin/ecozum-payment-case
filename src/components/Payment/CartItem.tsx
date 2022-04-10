// Imports
import { PackagesInterface } from '../../features/packages/types';

// Interface
interface PropsInterface {
	packageItem: PackagesInterface;
}

// Element
function CartItem({ packageItem }: PropsInterface) {
	return (
		<div key={packageItem.id} className="cartItem">
			<span className="cartItem__name">{packageItem.name}</span>
			<span className="cartItem__amount">
				{packageItem.amount}
				{packageItem.currency}
			</span>
		</div>
	);
}

export default CartItem;
