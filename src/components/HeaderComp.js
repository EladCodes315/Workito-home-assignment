import React from 'react';
import { StyleSheet, Text } from 'react-native';

function HeaderComp({ login }){
	return <Text style={[ styles.loginHeader, styles.setColorToWhite ]}>{login ? 'Login' : 'Register'}</Text>;
}

const styles = StyleSheet.create({
	setColorToWhite: {
		color: '#fff'
	},
	loginHeader: {
		alignSelf: 'center',
		fontSize: 40,
		marginTop: 120
	}
});

export default HeaderComp;
