import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		case 'signin':
			//* we do not want to update state on signup
			//* state is meant to start from scratch
			return { errorMessage: '', token: action.payload };
		case 'clear_error_message':
			return { ...state, errorMessage: '' };
		case 'signout':
			return { token: null, errorMessage: '' };
		default:
			return state;
	}
};

const autoSignin = (dispatch) => async () => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
		dispatch({ type: 'signin', payload: token });
		navigate('TrackList');
	} else {
		navigate('Signup');
	}
};

const clearErrorMessage = (dispatch) => {
	return () => {
		dispatch({ type: 'clear_error_message' });
	};
};

const signup = (dispatch) => {
	return async ({ email, password }) => {
		//* make api request
		try {
			const response = await trackerApi.post('/signup', { email, password });
			await AsyncStorage.setItem('token', response.data.token);
			//* update token state
			dispatch({ type: 'signin', payload: response.data.token });
			navigate('TrackList');
		} catch (error) {
			dispatch({ type: 'add_error', payload: 'Something went wrong' });
		}
	};
};

const signin = (dispatch) => {
	return async ({ email, password }) => {
		try {
			const response = await trackerApi.post('/signin', { email, password });
			await AsyncStorage.setItem('token', response.data.token);
			dispatch({ type: 'signin', payload: response.data.token });
			navigate('TrackList');
		} catch (error) {
			dispatch({ type: 'add_error', payload: 'Something went wrong with Signin' });
		}
	};
};

const signout = (dispatch) => {
	return async () => {
		await AsyncStorage.removeItem('token');
		dispatch({ type: 'signout' });
		navigate('loginFlow');
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage, autoSignin }, //* bound functions
	{ token: null, errorMessage: '' } //* state
);
