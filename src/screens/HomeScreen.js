import React from 'react';
import { Button, Text, View } from 'react-native';

function HomeScreen({ navigation }){
	return (
		<View>
			<Text>Hello From Home Screen</Text>
			<Button title="Go To Login" onPress={() => navigation.navigate('Login')} />
		</View>
	);
}

export default HomeScreen;
