// Interfaces
interface UserInterface {
	id: number | null;
	fullName: string;
	email: string;
}

interface UserReduxInterface extends UserInterface {
	isLoggedIn: boolean;
	apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	apiMessage: string | null;
}

interface LoginInterface {
	fullName: UserInterface['fullName'];
	email: UserInterface['email'];
}

export type { UserReduxInterface, UserInterface, LoginInterface };
