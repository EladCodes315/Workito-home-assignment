import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComp from '../components/HeaderComp';
import Password from '../components/Password';
import SignInButton from '../components/SignInButton';
import SignUpButton from '../components/SignUpButton';
import UserName from '../components/UserName';

function RegisterScreen({ navigation }){
	return (
		<View style={styles.container}>
			<HeaderComp />

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
		marginRight: 40
	}
});

export default RegisterScreen;
