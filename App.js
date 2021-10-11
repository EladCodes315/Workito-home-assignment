import React, { lazy, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, Text, View } from 'react-native'; // read more about logBox and the error that it relates to

const LoginScreen = lazy(() => import('./src/screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./src/screens/RegisterScreen'));
const WelcomeScreenNavigator = lazy(() => import('./src/navigators/WelcomeScreenNavigator'));

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
					<Stack.Screen name="WelcomeNav" component={WelcomeScreenNavigator} options={{ headerShown: false }} />
				</Stack.Navigator>
			</Suspense>
		</NavigationContainer>
	);
}
