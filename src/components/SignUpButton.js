import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function SignUpButton({ navigation }){
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.signUpBtn}>
			<Text>Sign Up</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	signUpBtn: {
		backgroundColor: 'red',
		height: 70,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default SignUpButton;
