import { View, Text } from 'react-native';
import React from 'react';

const Categories = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'transparent',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<View style={{ backgroundColor: 'white', padding: 20 }}>
				<Text>Categories</Text>
			</View>
		</View>
	);
};

export default Categories;
