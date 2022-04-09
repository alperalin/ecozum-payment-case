import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './features/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Components
import Signup from './components/Signup';
import App from './components/App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<Signup />} />
					<Route path="/app" element={<App />} />
					<Route path="*" element={<p>404! Nothing Found!</p>} />
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
