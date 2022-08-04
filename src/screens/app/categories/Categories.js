import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import { showTabbar } from '../../../store/actions/app-settings-actions';
import SubCategory from './SubCategory';

const Categories = () => {
	const route = useRoute();
	const mounted = useRef(false);
	const dispatch = useDispatch();

	useEffect(() => {
		mounted.current = true;

		if (route.name === 'CategoriesScreen') {
			if (mounted.current) {
				dispatch(showTabbar());
			}
		}

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, [route.name]);

	return (
		<View style={{ flex: 1, backgroundColor: '#fffff7', paddingHorizontal: 8 }}>
			<SubCategory />
		</View>
	);
};

export default Categories;
