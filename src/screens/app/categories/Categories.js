import React from 'react';
import { View } from 'react-native';

import SubCategory from './SubCategory';

const Categories = () => {
	return (
		<View style={{ flex: 1, backgroundColor: '#fffff7', paddingHorizontal: 8 }}>
			<SubCategory />
		</View>
	);
};

export default Categories;
