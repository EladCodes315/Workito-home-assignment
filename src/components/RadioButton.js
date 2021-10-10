import React from 'react';
import { StyleSheet, View } from 'react-native';

function RadioButton({ selected }){
	return (
		<View style={styles.container}>
			{selected ? (
				<View
					style={{
						height: 12,
						width: 12,
						borderRadius: 6,
						backgroundColor: '#fff'
					}}
				/>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 24,
		width: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default RadioButton;
