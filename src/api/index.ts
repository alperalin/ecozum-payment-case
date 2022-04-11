import axios from 'axios';

// Axios create
// You can make an api call by
// calling api variable. It will provide the url.
const api = axios.create({
	baseURL: ' https://6249a1e8fd7e30c51c042ccb.mockapi.io/',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
