import React, { lazy } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WelcomeScreen = lazy(() => import('../screens/WelcomeScreen'));
const AddEmployeeScreen = lazy(() => import('../screens/AddEmployeeScreen'));
const CalculationScreen = lazy(() => import('../screens/CalculationScreen'));

const Tab = createBottomTabNavigator();

function WelcomeScreenNavigator(){
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = focused ? 'home' : 'home-outline';
					}
					else if (route.name === 'AddEmployee') {
						iconName = focused ? 'person-add' : 'person-add-outline';
					}
					else if (route.name === 'Calculation') {
						iconName = focused ? 'calculator' : 'calculator-outline';
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: 'dodgerblue',
				tabBarInactiveTintColor: 'gray'
			})}
		>
			<Tab.Screen name="AddEmployee" component={AddEmployeeScreen} options={{ headerShown: false }} />
			<Tab.Screen name="Home" component={WelcomeScreen} options={{ headerShown: false }} />
			<Tab.Screen name="Calculation" component={CalculationScreen} options={{ headerShown: false }} />
		</Tab.Navigator>
	);
}

export default WelcomeScreenNavigator;
