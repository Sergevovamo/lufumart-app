import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	getProductCategories,
	getProductSubCategoryByCategory,
} from '../../../store/actions/product-actions';

const Tabs = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const productCategories = useSelector(
		(state) => state.products?.productCategories
	);

	const [selectedTab, setSelectedTab] = useState({
		name: 'Electronics',
	});

	useEffect(() => {
		dispatch(getProductCategories());
	}, []);
	// console.log(selectedTab);

	useEffect(() => {
		dispatch(getProductSubCategoryByCategory(selectedTab?._id));
	}, [selectedTab]);
	return (
		<>
			<FlatList
				data={productCategories}
				keyExtractor={(item, index) => `${item}-${index}`}
				horizontal
				style={{ flexGrow: 0 }}
				contentContainerStyle={{ paddingHorizontal: 5 }}
				showsHorizontalScrollIndicator={true}
				renderItem={({ item: category }) => {
					const { name } = category;
					// console.log(name);

					return (
						<TouchableOpacity onPress={() => setSelectedTab(category)}>
							<View
								style={[
									styles.pill,
									{
										backgroundColor:
											selectedTab?.name === name ? '#f68b1e' : 'transparent',
									},
								]}
							>
								<Text
									style={[
										styles.pillText,
										{
											color: selectedTab?.name === name ? '#fff' : '#000000',
										},
									]}
								>
									{name}
								</Text>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</>
	);
};

export default Tabs;

const styles = StyleSheet.create({
	pill: {
		marginVertical: 10,
		paddingHorizontal: 20,
		paddingVertical: Platform.OS === 'ios' ? 20 / 2 : 12,
		borderRadius: 5,
	},
	pillText: {
		fontWeight: '700',
	},
});
