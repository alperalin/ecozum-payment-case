// Interface
interface PaymentInterface {
	packageIds: string[] | null;
	cardHolderName: string;
	cardNumber: string;
	expireDate: string;
	cvv: string;
	totalAmount: number;
}

interface PaymentReduxInterface extends PaymentInterface {
	apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	apiMessage: string | null;
}

export type { PaymentInterface, PaymentReduxInterface };
