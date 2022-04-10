import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './features/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Components
import Auth from './components/Auth';
import Signup from './components/Signup';
import Packages from './components/Packages';
import Payment from './components/Payment';
import Thankyou from './components/Thankyou';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path="/" element={<Signup />} />
				<Route
					path="/packages"
					element={
						<Auth>
							<Packages />
						</Auth>
					}
				></Route>

				<Route
					path="/payment"
					element={
						<Auth>
							<Payment />
						</Auth>
					}
				></Route>

				<Route
					path="/thankyou"
					element={
						<Auth>
							<Thankyou />
						</Auth>
					}
				></Route>

				<Route path="*" element={<p>404! Nothing Found!</p>} />
			</Routes>
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
