// Interface
interface PaymentInterface {
	packageIds: string[];
	totalAmount: number;
	agreement: string;
}

interface PaymentReduxInterface extends PaymentInterface {
	apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	apiMessage: string | null;
}

export type { PaymentInterface, PaymentReduxInterface };
