// Interfaces
interface PackagesInterface {
	id: number;
	name: string;
	imagePath: string;
	details: string[];
	tags: string[];
	amount: number;
	currency: string;
	selected?: boolean;
}

interface PackagesReduxInterface {
	data: PackagesInterface[];
	apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	apiMessage: string | null;
}

export type { PackagesInterface, PackagesReduxInterface };
