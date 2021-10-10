import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

function RegisterScreen({ navigation }){
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleSignUp = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(() => navigation.replace('Login'))
			.catch(() => Alert.alert('Error', 'Something went wrong'));
	};

	return (
		<View style={styles.container}>
			<Text style={[ styles.header, styles.setColorToWhite ]}>Register</Text>
			<View style={styles.inputs}>
				<View>
					<Text style={styles.setColorToWhite}>Email</Text>
					<TextInput style={styles.inputBackground} value={email} onChangeText={text => setEmail(text)} />
				</View>
				<View>
					<Text style={styles.setColorToWhite}>Password</Text>
					<TextInput style={styles.inputBackground} value={password} onChangeText={text => setPassword(text)} secureTextEntry />
				</View>
				<Text style={styles.setColorToWhite}>
					Already have an account?{' '}
					<Text style={styles.link} onPress={() => navigation.replace('Login')}>
						Sign In!
					</Text>
				</Text>
			</View>
			<View>
				<TouchableOpacity onPress={handleSignUp} style={styles.button}>
					<Text>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'dodgerblue',
		justifyContent: 'space-between'
	},
	header: {
		alignSelf: 'center',
		fontSize: 40,
		marginTop: 70
	},
	inputs: {
		width: '70%',
		height: 150,
		marginLeft: 'auto',
		marginRight: 'auto',
		justifyContent: 'space-between'
	},
	setColorToWhite: {
		color: '#fff'
	},
	inputBackground: {
		backgroundColor: '#fff',
		width: '100%',
		height: 40,
		borderRadius: 10
	},
	link: {
		color: 'blue'
	},
	button: {
		backgroundColor: 'green',
		height: 70,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default RegisterScreen;
