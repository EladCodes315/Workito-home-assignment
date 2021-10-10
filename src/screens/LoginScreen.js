import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

function LoginScreen({ navigation }){
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				navigation.replace('Welcome');
			}
		});
		return unsubscribe;
	}, []);

	const handleSignIn = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then(() => navigation.replace('Welcome'))
			.catch(() => Alert.alert('Error', 'Something went wrong'));
	};

	return (
		<View style={styles.container}>
			<Text style={[ styles.header, styles.setColorToWhite ]}>Login</Text>
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
					Dont have an account?{' '}
					<Text style={styles.link} onPress={() => navigation.replace('Register')}>
						Sign Up!
					</Text>
				</Text>
			</View>
			<View>
				<TouchableOpacity onPress={handleSignIn} style={styles.button}>
					<Text>Sign In</Text>
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

export default LoginScreen;
