import React, { lazy, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, Text, View } from 'react-native';

const LoginScreen = lazy(() => import('./src/screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./src/screens/RegisterScreen'));
const WelcomeScreen = lazy(() => import('./src/screens/WelcomeScreen'));
const AddEmployeeScreen = lazy(() => import('./src/screens/AddEmployeeScreen'));
const CalculationScreen = lazy(() => import('./src/screens/CalculationScreen'));

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([ 'Setting a timer for a long period of time' ]);

export default function App(){
	return (
		<NavigationContainer>
			<Suspense
				fallback={
					<View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
						<Text>Loading...</Text>
					</View>
				}
			>
				<Stack.Navigator>
					<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
					<Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
					<Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
					<Stack.Screen name="AddEmployee" component={AddEmployeeScreen} options={{ headerShown: false }} />
					<Stack.Screen name="Calculation" component={CalculationScreen} options={{ headerShown: false }} />
				</Stack.Navigator>
			</Suspense>
		</NavigationContainer>
	);
}
