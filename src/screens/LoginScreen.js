import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import HeaderComp from '../components/HeaderComp';
import Password from '../components/Password';
import SignInButton from '../components/SignInButton';
import SignUpButton from '../components/SignUpButton';
import UserName from '../components/UserName';

function LoginScreen({ navigation }){
	return (
		<View style={styles.container}>
			<HeaderComp login="Login" />

			<View style={styles.inputs}>
				<UserName />
				<Password />
			</View>

			<View>
				<SignInButton navigation={navigation} />
				<SignUpButton navigation={navigation} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	inputs: {
		width: '70%',
		marginLeft: 'auto',
		marginRight: 'auto'
	}
});

export default LoginScreen;
