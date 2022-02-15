import { View, Text } from 'react-native';
import React from 'react';

const Search = () => {
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
				<Text>Search items</Text>
			</View>
		</View>
	);
};

export default Search;
