import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase';

function AddEmployeeScreen({ navigation }){
	const [ name, setName ] = useState('');
	const [ employeeId, setEmployeeId ] = useState('');

	const handleAddition = () => {
		if (name === '' || employeeId === '') {
			Alert.alert('Missing Values', 'One or more of the fields is Empty');
		}
		else {
			db
				.get()
				.then(snapshot => {
					let check = false;
					snapshot.forEach(doc => (check = doc.data().employeeId === employeeId || check));
					if (check) {
						Alert.alert('Employee exist', 'The employee already exists in the database');
					}
					else {
						db
							.add({
								employeeId,
								name,
								userId: auth.currentUser.uid
							})
							.then(() => navigation.replace('Welcome'))
							.catch(() =>
								Alert.alert('Error', 'Something went wrong', [ { text: 'Back', onPress: () => navigation.replace('Welcome') } ])
							);
					}
				})
				.catch(() =>
					Alert.alert('Error', 'Something went wrong when fetching data', [
						{ text: 'Back', onPress: () => navigation.replace('Welcome') }
					])
				);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={[ styles.header, styles.setColorToWhite ]}>Add</Text>
			<View style={styles.inputs}>
				<View>
					<Text style={styles.setColorToWhite}>Full Name</Text>
					<TextInput style={styles.inputBackground} value={name} onChangeText={text => setName(text)} />
				</View>
				<View>
					<Text style={styles.setColorToWhite}>ID</Text>
					<TextInput style={styles.inputBackground} keyboardType="numeric" value={employeeId} onChangeText={text => setEmployeeId(text)} />
				</View>
			</View>
			<View style={styles.buttons}>
				<TouchableOpacity onPress={handleAddition} style={styles.button}>
					<Text>Add</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.replace('Welcome')} style={[ styles.button, { backgroundColor: 'red' } ]}>
					<Text>Back</Text>
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
	buttons: {
		flexDirection: 'row'
	},
	button: {
		backgroundColor: 'green',
		height: 70,
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default AddEmployeeScreen;
