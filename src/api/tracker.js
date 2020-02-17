import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
	baseURL: 'https://e4b3e9d9.ngrok.io'
});

instance.interceptors.request.use(
	//* called before request
	(config) => {
		const token = AsyncStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	//* called if there is an error with request
	(err) => {
		return Promise.reject(err);
	}
);

export default instance;
