import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import TopSellingItems from '../home/TopSellingItems';

const Categories = () => {
	return (
		<ScrollView style={{ backgroundColor: '#fffff7' }}>
			<View style={styles.titleOnlyHeader}>
				<Text
					style={{
						fontSize: 20,
						color: '#000000',
						fontWeight: 'bold',
						paddingBottom: 5,
					}}
				>
					Top Selling Items
				</Text>
			</View>
			<TopSellingItems />
		</ScrollView>
	);
};

export default Categories;

const styles = StyleSheet.create({
	titleOnlyHeader: {
		marginHorizontal: 18,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
