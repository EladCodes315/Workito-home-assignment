import React, { useEffect, useState } from 'react';
import { Alert, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase';
import RadioButton from '../components/RadioButton';
import * as formulaValues from '../../constants';

function CalculationScreen(){
	const [ employee, setEmployee ] = useState({});
	const [ employeesArr, setEmployeesArr ] = useState([]);
	const [ veterancyStr, setVeterancyStr ] = useState('');
	const [ hoursStr, setHoursStr ] = useState('');
	const [ jobDescription, setJobDescription ] = useState('');
	const [ calculation, setCalculation ] = useState(0);

	useEffect(() => {
		const query = db.where('userId', '==', auth.currentUser.uid);
		const observer = query.onSnapshot(
			querySnapshot => {
				let arr = [];
				querySnapshot.docs.forEach(docSnapshot => {
					if (docSnapshot.data().userId === auth.currentUser.uid) {
						arr.push(docSnapshot.data());
					}
				});
				setEmployeesArr(arr);
			},
			err => {
				console.log(`Encountered error: ${err}`);
			}
		);
		return observer;
	}, []);

	const formula = (hours, desc, multiplier) => {
		if (desc === 'permanant-weekly-hours') {
			return multiplier * hours * formulaValues.recoveryDayValue / formulaValues.weeklyDivider;
		}
		else if (desc === 'permanant-monthly-hours') {
			return multiplier * hours * formulaValues.recoveryDayValue / formulaValues.monthlyDivider;
		}
		else {
			return multiplier * hours * formulaValues.recoveryDayValue / formulaValues.changingDivider;
		}
	};

	const handleCalculation = () => {
		if (employee === '' || veterancyStr === '' || hoursStr === '' || jobDescription === '') {
			Alert.alert('Missing Values', 'One or more of the fields is Empty');
		}
		else {
			let veterancyNumber = parseInt(veterancyStr);
			let HoursNumber = parseInt(hoursStr);
			let recoveryDayPayment = 0;
			let i = 0;
			while (i !== -1) {
				i++;
				if (veterancyNumber >= formulaValues.veterancyMultiplier[i][0] && veterancyNumber <= formulaValues.veterancyMultiplier[i][1]) {
					recoveryDayPayment = formula(HoursNumber, jobDescription, formulaValues.veterancyMultiplier[i][2]);
					i = -1;
				}
			}
			setCalculation(recoveryDayPayment);
			setJobDescription('');
			setHoursStr('');
			setVeterancyStr('');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Calculate</Text>
			<View style={styles.inputs}>
				<View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
					<Text>Employee </Text>
					<Picker selectedValue={employee} style={styles.picker} onValueChange={emp => setEmployee(emp)}>
						{employeesArr.map((emp, index) => <Picker.Item key={index} label={emp.name} value={emp} />)}
					</Picker>
				</View>
				<View>
					<Text>Veterancy</Text>
					<TextInput
						style={styles.inputBackground}
						keyboardType="numeric"
						value={veterancyStr}
						onChangeText={text => setVeterancyStr(text)}
					/>
				</View>
				<View style={styles.radioButtons}>
					<Text>Job Description</Text>
					<TouchableOpacity
						style={{ flexDirection: 'row-reverse' }}
						onPress={() => {
							if (jobDescription !== 'permanant-weekly-hours') {
								setJobDescription('permanant-weekly-hours');
							}
						}}
					>
						<RadioButton selected={jobDescription === 'permanant-weekly-hours'} />
						<Text> Permanant Weekly Hours</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ flexDirection: 'row-reverse' }}
						onPress={() => {
							if (jobDescription !== 'permanant-monthly-hours') {
								setJobDescription('permanant-monthly-hours');
							}
						}}
					>
						<RadioButton selected={jobDescription === 'permanant-monthly-hours'} />
						<Text> Permanant Monthly Hours</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ flexDirection: 'row-reverse' }}
						onPress={() => {
							if (jobDescription !== 'changing-hours') {
								setJobDescription('changing-hours');
							}
						}}
					>
						<RadioButton selected={jobDescription === 'changing-hours'} />
						<Text> Changing Hours</Text>
					</TouchableOpacity>
				</View>
				{jobDescription === '' ? (
					<View style={{ height: 50 }} />
				) : (
					<View>
						<Text>
							{jobDescription === 'permanant-weekly-hours' ? (
								'Number of Hours Working in a week'
							) : jobDescription === 'permanant-monthly-hours' ? (
								'Number of Hours Working in a month'
							) : (
								'Number of Hours Worked this year'
							)}
						</Text>
						<TextInput style={styles.inputBackground} keyboardType="numeric" value={hoursStr} onChangeText={text => setHoursStr(text)} />
					</View>
				)}
			</View>
			{calculation === 0 ? (
				<View style={styles.payment} />
			) : (
				<View style={styles.payment}>
					<Text>The required payment is: {Math.floor(calculation)}</Text>
				</View>
			)}
			<TouchableOpacity onPress={handleCalculation} style={styles.button}>
				<Text style={{ color: 'dodgerblue' }}>Calculate</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	header: {
		alignSelf: 'center',
		fontSize: 40
	},
	inputs: {
		width: '70%',
		height: 150,
		marginLeft: 'auto',
		marginRight: 'auto',
		justifyContent: 'space-between'
	},
	picker: {
		height: 50,
		width: 150,
		alignSelf: 'center'
	},
	inputBackground: {
		backgroundColor: '#eee',
		width: '100%',
		height: 40,
		borderRadius: 10
	},
	radioButtons: {
		alignItems: 'flex-end',
		height: 100,
		justifyContent: 'space-between'
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
	payment: {
		position: 'absolute',
		bottom: 100
	}
});

export default CalculationScreen;
