import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

function WelcomeScreen({ navigation }){
	const handleSignOut = () => {
		auth.signOut().then(() => navigation.navigate('Login')).catch(() => Alert.alert('Error', 'Something went wrong'));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Welcome!</Text>

			<TouchableOpacity onPress={handleSignOut} style={styles.button}>
				<Text style={styles.buttonText}>Logout</Text>
			</TouchableOpacity>
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
	button: {
		backgroundColor: '#eee',
		height: 60,
		width: '50%',
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		borderRadius: 30
	},
	buttonText: {
		color: 'dodgerblue'
	},
	image: {
		width: '90%',
		alignSelf: 'center',
		height: 60,
		position: 'absolute',
		bottom: 20
	}
});

export default WelcomeScreen;
