// Imports
import { Navigate } from 'react-router-dom';

// Store
import { useAppSelector } from '../../hooks/hooks';

// antd
import { Spin } from 'antd';

// interface
interface AuthInterface {
	children: JSX.Element;
}

function Auth({ children }: AuthInterface) {
	// Redux
	const { isLoggedIn, apiStatus } = useAppSelector((state) => state.user);

	// State'teki isLoggedIn degeri false ise ziyaretciyi signup sayfasina gonder
	if (apiStatus === 'loading') {
		<Spin size="large" tip="Loading" />;
	} else if (!isLoggedIn) {
		// based on https://reactrouter.com/docs/en/v6/examples/auth
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/" />;
	}

	return children;
}

export default Auth;
