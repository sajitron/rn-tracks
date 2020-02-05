import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		case 'signup':
			//* we do not want to update state on signup
			//* state is meant to start from scratch
			return { errorMessage: '', token: action.payload };
		default:
			return state;
	}
};

const signup = (dispatch) => {
	return async ({ email, password }) => {
		//* make api request
		try {
			const response = await trackerApi.post('/signup', { email, password });
			await AsyncStorage.setItem('token', response.data.token);
			//* update token state
			dispatch({ type: 'signup', payload: response.data.token });
			navigate('TrackList');
		} catch (error) {
			dispatch({ type: 'add_error', payload: 'Something went wrong' });
		}
	};
};

const signin = (dispatch) => {
	return ({ email, password }) => {
		//* make api request
		//* handle success by updating state
		//* handle failure by showing error message
	};
};

const signout = (dispatch) => {
	return () => {
		//* sign out
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup }, //* bound functions
	{ token: null, errorMessage: '' } //* state
);
