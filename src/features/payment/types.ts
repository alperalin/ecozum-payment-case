// Interface
interface PaymentInterface {
	packageIds: string[];
	totalAmount: number;
	agreement: string;
}

interface PaymentAgreementInterface {
	content: string;
}

interface PaymentReduxInterface extends PaymentInterface {
	apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	apiMessage: string | null;
}

export type {
	PaymentInterface,
	PaymentAgreementInterface,
	PaymentReduxInterface,
};
