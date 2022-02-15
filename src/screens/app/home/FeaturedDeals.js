import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

import { AntDesign } from '@expo/vector-icons';

import FeaturedItems from './FeaturedItems';
import TrendingItems from './TrendingItems';

const FeaturedDeals = () => {
	return (
		<ScrollView style={{ backgroundColor: '#fffff7' }}>
			<TouchableOpacity style={styles.titleOnlyHeader}>
				<Text
					style={{
						fontSize: 20,
						color: '#000000',
						fontWeight: 'bold',
						paddingBottom: 5,
					}}
				>
					Featured Deals
				</Text>
				<AntDesign name="right" size={24} color="#f68b1e" />
			</TouchableOpacity>
			<FeaturedItems />

			<TouchableOpacity style={styles.titleOnlyHeader}>
				<Text
					style={{
						fontSize: 20,
						color: '#000000',
						fontWeight: 'bold',
						paddingBottom: 5,
					}}
				>
					Trending Deals
				</Text>
				<AntDesign name="right" size={24} color="#f68b1e" />
			</TouchableOpacity>
			<TrendingItems />
		</ScrollView>
	);
};

export default FeaturedDeals;

const styles = StyleSheet.create({
	titleOnlyHeader: {
		marginHorizontal: 18,
		paddingVertical: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
