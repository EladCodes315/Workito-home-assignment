import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function SignInButton({ navigation }){
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.signInBtn}>
			<Text>Sign In</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	signInBtn: {
		backgroundColor: 'green',
		height: 70,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default SignInButton;
