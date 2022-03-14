import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tabs = () => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);
	return (
		<>
			<FlatList
				data={tabs}
				keyExtractor={(item, index) => `${item}-${index}`}
				horizontal
				style={{ flexGrow: 0 }}
				contentContainerStyle={{ padding: 5 }}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item: tab }) => {
					return (
						<TouchableOpacity onPress={() => setSelectedTab(tab)}>
							<View
								style={[
									styles.pill,
									{
										backgroundColor:
											selectedTab === tab ? '#f68b1e' : 'transparent',
									},
								]}
							>
								<Text
									style={[
										styles.pillText,
										{
											color: selectedTab === tab ? '#fff' : '#000000',
										},
									]}
								>
									{tab}
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
		paddingHorizontal: 20,
		paddingVertical: 20 / 2,
		borderRadius: 5,
	},
	pillText: {
		fontWeight: '700',
	},
});

const tabs = [
	'Supermarket',
	'Health & Beauty',
	'Home & Office',
	'Phones & Tablets',
	'Computing',
	'Electronics',
	'Fashion',
	'Gaming',
	'Baby Products',
	'Sporting Goods',
	'Garden & Outdoors',
];
