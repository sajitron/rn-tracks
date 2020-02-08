import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
	const { state, signup, clearErrorMessage, autoSignin } = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<NavigationEvents onWillBlur={clearErrorMessage} />
			<AuthForm
				headerText="Sign up for tracker"
				errorMessage={state.errorMessage}
				submitButtonText="Sign up"
				onSubmit={signup}
			/>
			<NavLink routeName="Signin" text="Already have an account? Sign in instead" />
		</View>
	);
};

SignupScreen.navigationOptions = () => {
	return {
		headerShown: false
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginBottom: 200
	},
	link: {
		color: 'blue'
	}
});

export default SignupScreen;
