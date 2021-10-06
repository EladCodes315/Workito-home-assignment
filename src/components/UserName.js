import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

function UserName(props){
	const [ username, setUsername ] = useState('');
	console.log(username);
	return (
		<View style={styles.userNameSec}>
			<Text style={styles.setColorToWhite}>Username</Text>
			<TextInput style={styles.background} value={username} onChange={e => setUsername(e.target.value)} />
		</View>
	);
}

const styles = StyleSheet.create({
	setColorToWhite: {
		color: '#fff'
	},
	userNameSec: {
		margin: 10
	},
	background: {
		backgroundColor: '#fff',
		width: '100%',
		height: 40
	}
});

export default UserName;
