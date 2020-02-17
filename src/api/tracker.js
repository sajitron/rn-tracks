import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
	baseURL: 'https://82238788.ngrok.io'
});

instance.interceptors.request.use(
	//* called before request
	async (config) => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			console.log('token', token);
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	//* called if there is an error with request
	(err) => {
		console.log(err);
		return Promise.reject(err);
	}
);

export default instance;
