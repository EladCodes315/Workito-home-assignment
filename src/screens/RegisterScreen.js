import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

function RegisterScreen({ navigation }){
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleSignUp = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(() => navigation.replace('Login'))
			.catch(() => Alert.alert('Error', 'Something went wrong'));
		setEmail('');
		setPassword('');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Register</Text>
			<View style={styles.inputs}>
				<View>
					<Text style>Email</Text>
					<TextInput style={styles.inputBackground} keyboardType="email-address" value={email} onChangeText={text => setEmail(text)} />
				</View>
				<View>
					<Text>Password</Text>
					<TextInput style={styles.inputBackground} value={password} onChangeText={text => setPassword(text)} secureTextEntry />
				</View>
				<Text>
					Already have an account?{' '}
					<Text style={styles.link} onPress={() => navigation.replace('Login')}>
						Sign In!
					</Text>
				</Text>
			</View>
			<View>
				<TouchableOpacity onPress={handleSignUp} style={styles.button}>
					<Text style={{ color: 'dodgerblue' }}>Sign Up</Text>
				</TouchableOpacity>
			</View>
			<Image source={require('../assets/ImageInBottom.png')} style={styles.image} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'space-around'
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
	inputBackground: {
		backgroundColor: '#eee',
		width: '100%',
		height: 40,
		borderRadius: 10
	},
	link: {
		color: 'blue'
	},
	button: {
		backgroundColor: '#eee',
		height: 60,
		width: '50%',
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		borderRadius: 30
	},
	image: {
		width: '90%',
		alignSelf: 'center',
		height: 60,
		position: 'absolute',
		bottom: 10
	}
});

export default RegisterScreen;
