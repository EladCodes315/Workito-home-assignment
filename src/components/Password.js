import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

function Password(props){
	const [ password, setPassword ] = useState('');
	console.log(password);
	return (
		<View style={styles.passwordSec}>
			<Text style={styles.setColorToWhite}>Password</Text>
			<TextInput style={styles.background} value={password} onChange={e => setPassword(e.target.value)} />
		</View>
	);
}

const styles = StyleSheet.create({
	setColorToWhite: {
		color: '#fff'
	},
	passwordSec: {
		margin: 10
	},
	background: {
		backgroundColor: '#fff',
		width: '100%',
		height: 40
	}
});

export default Password;
