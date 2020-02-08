import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
	const { state, signin } = useContext(AuthContext);
	return (
		<View style={styles.container}>
			<AuthForm
				headerText="Sign In"
				errorMessage={state.errorMessage}
				submitButtonText="Sign In"
				onSubmit={signin}
			/>
			<NavLink routeName="Signup" text="Don't have an account? Sign up instead" />
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
