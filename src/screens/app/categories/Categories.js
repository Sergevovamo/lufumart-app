import React from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Dimensions,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Tabs from './Tabs';
import SubCategory from './SubCategory';

const { width, height } = Dimensions.get('screen');

const CELL_WIDTH = width * 0.64;
const CELL_HEIGHT = CELL_WIDTH * 1.4;
const FULL_SIZE = CELL_WIDTH;

const Categories = () => {
	return (
		<ScrollView style={{ backgroundColor: '#fffff7', paddingHorizontal: 8 }}>
			<Tabs />
			<SubCategory />
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
