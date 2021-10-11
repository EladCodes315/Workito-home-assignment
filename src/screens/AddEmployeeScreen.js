import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase';

function AddEmployeeScreen(){
	const [ name, setName ] = useState('');
	const [ employeeId, setEmployeeId ] = useState('');

	const handleAddition = () => {
		if (name === '' || employeeId === '') {
			Alert.alert('Missing Values', 'One or more of the fields is Empty');
		}
		else {
			// else if () {

			// }
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
							.then(() => Alert.alert('Success', 'Employee added successfully!'))
							.catch(() => Alert.alert('Error', 'Something went wrong'));
					}
				})
				.catch(() => Alert.alert('Error', 'Something went wrong when fetching data'));
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Add Employee</Text>
			<View style={styles.inputs}>
				<View>
					<Text>Full Name</Text>
					<TextInput style={styles.inputBackground} value={name} onChangeText={text => setName(text)} />
				</View>
				<View>
					<Text>ID</Text>
					<TextInput style={styles.inputBackground} keyboardType="numeric" value={employeeId} onChangeText={text => setEmployeeId(text)} />
				</View>
			</View>

			<TouchableOpacity onPress={handleAddition} style={styles.button}>
				<Text style={{ color: 'dodgerblue' }}>Add</Text>
			</TouchableOpacity>
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

export default AddEmployeeScreen;
