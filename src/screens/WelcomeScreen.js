import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

function WelcomeScreen({ navigation }){
	const handleSignOut = () => {
		auth.signOut().then(() => navigation.replace('Login')).catch(() => Alert.alert('Error', 'Something went wrong'));
	};

	const startCalculating = () => {
		navigation.replace('Calculation');
	};

	const addEmployee = () => {
		navigation.replace('AddEmployee');
	};

	return (
		<View style={[ styles.container ]}>
			<Text style={[ styles.header, styles.setColorToWhite ]}>Welcome!</Text>
			<View style={styles.alignButtons}>
				<TouchableOpacity onPress={startCalculating} style={styles.button}>
					<Text>Calculate Recovery Days</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={addEmployee} style={{ ...styles.button, backgroundColor: 'red' }}>
					<Text>Add Employee</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleSignOut} style={styles.button}>
					<Text>Logout</Text>
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
	setColorToWhite: {
		color: '#fff'
	},
	alignButtons: {
		flexDirection: 'row'
	},
	button: {
		backgroundColor: 'green',
		height: 70,
		width: '33.333%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default WelcomeScreen;
