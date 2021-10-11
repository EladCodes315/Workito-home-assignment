import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

function LoginScreen({ navigation }){
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				navigation.replace('WelcomeNav');
			}
		});
		return unsubscribe;
	}, []);

	const handleSignIn = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then(() => navigation.navigate('WelcomeNav'))
			.catch(() => Alert.alert('Error', 'Something went wrong'));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Login</Text>
			<View style={styles.inputs}>
				<View>
					<Text>Email</Text>
					<TextInput style={styles.inputBackground} value={email} onChangeText={text => setEmail(text)} />
				</View>
				<View>
					<Text>Password</Text>
					<TextInput style={styles.inputBackground} value={password} onChangeText={text => setPassword(text)} secureTextEntry />
				</View>
				<Text>
					Dont have an account?{' '}
					<Text style={styles.link} onPress={() => navigation.replace('Register')}>
						Sign Up!
					</Text>
				</Text>
			</View>
			<View>
				<TouchableOpacity onPress={handleSignIn} style={styles.button}>
					<Text style={{ color: 'dodgerblue' }}>Sign In</Text>
				</TouchableOpacity>
			</View>
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
	}
});

export default LoginScreen;
