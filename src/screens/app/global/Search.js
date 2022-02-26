import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';

const Search = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const onChangeSearch = (query) => setSearchQuery(query);

	return (
		<>
			<Searchbar
				placeholder="Search products"
				onChangeText={onChangeSearch}
				value={searchQuery}
				style={{
					width: '80%',
					marginTop: 10,
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
			/>
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
		</>
	);
};

export default Search;
