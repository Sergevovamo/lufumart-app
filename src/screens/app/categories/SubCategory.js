import React, { useEffect } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import {
	getProductSubCategoryByCategory,
	getProductsBySubCategory,
} from '../../../store/actions/product-actions';
import Tabs from './Tabs';

const SubCategory = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	// get sub categories
	const productSubCategories = useSelector(
		(state) => state.products?.productSubCategoriesByCategory
	);

	// get products by sub category
	const getProductSubCategories = useSelector(
		(state) => state.products?.getProductsBySubCategory
	);

	useEffect(() => {
		let categoryId = '627eaa45dfa8780fea3c8044';
		dispatch(getProductSubCategoryByCategory(categoryId));
	}, []);

	useEffect(() => {
		let payload = {
			subCategoryId: '627eb4fbdfa8780fea3c80b9',
			limit: '12',
		};
		dispatch(getProductsBySubCategory(payload));
	}, [productSubCategories]);

	return (
		<>
			{productSubCategories?.length > 0 ? (
				<FlatList
					data={productSubCategories}
					ListHeaderComponent={Tabs}
					keyExtractor={(item, index) => `${item}-${index}`}
					style={{ flexGrow: 0 }}
					contentContainerStyle={{ padding: 5 }}
					showsVerticalScrollIndicator={false}
					renderItem={({ item: sub }) => {
						const { name } = sub;
						// console.log(sub);

						return (
							<>
								<View style={styles.container}>
									<View style={styles.titleOnlyHeader}>
										<Text style={styles.subTitle}>{name}</Text>
										<TouchableOpacity>
											<AntDesign
												name="arrowright"
												size={24}
												color="#f68b1e"
												style={{ paddingHorizontal: 15 }}
											/>
										</TouchableOpacity>
									</View>
									<View
										style={{
											paddingVertical: 5,
											borderBottomColor: 'black',
											borderBottomWidth: 0.5,
										}}
									/>
									<View style={styles.itemContainer}>
										{getProductSubCategories?.map((item, index) => {
											const { name, imageUrl } = item;
											return (
												<TouchableOpacity key={index} style={styles.itemCard}>
													<View style={styles.imageContainer}>
														<Image
															source={{
																uri: `${imageUrl[0]}`,
															}}
															style={styles.image}
														/>
													</View>
													<Text numberOfLines={1} style={styles.itemText}>
														{name}
													</Text>
												</TouchableOpacity>
											);
										})}
									</View>
								</View>
							</>
						);
					}}
				/>
			) : (
				<>
					<ActivityIndicator size="large" style={styles.loading} />
				</>
			)}
		</>
	);
};

export default SubCategory;

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		marginTop: 10,
		backgroundColor: '#fff',
		minHeight: 250,
		borderRadius: 5,
		...Platform.select({
			ios: {
				shadowColor: 'gray',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.5,
			},
			android: {
				elevation: -5, // its negative to allow effective box shadow
				position: 'relative',
				borderWidth: 1,
				borderColor: '#f3f3f3',
				zIndex: 50,
			},
		}),
	},
	titleOnlyHeader: {
		marginHorizontal: 5,
		paddingTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	subTitle: {
		fontWeight: '700',
	},
	itemContainer: {
		marginTop: 5,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: '100%',
		backgroundColor: '#fff',
	},
	itemCard: {
		width: Platform.OS === 'ios' ? '22%' : '20%',
		minHeight: 85,
		marginVertical: 5,
		marginHorizontal: 2,
		backgroundColor: '#fff',
	},
	imageContainer: {
		backgroundColor: '#f3f7ff',
		alignItems: 'center',
		width: '100%',
		minHeight: 65,
		borderRadius: 5,
	},
	image: {
		resizeMode: 'contain',
		width: '85%',
		height: 65,
	},
	itemText: {
		fontSize: 12,
		textAlign: 'center',
	},
});

const subCategory = [
	{
		name: 'Food Cupboard',
	},
	{
		name: 'Beer, Wine & Spirit',
	},
	{
		name: 'Drinks',
	},
	{
		name: 'Household Supplies',
	},
];

const viewedProducts = [
	{
		name: 'Laptops',
		price: 69999,
		vat: 1799,
		itemsInStock: 45,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898655/samples/ecommerce/vpavic_4291_20201113_0337_Edit.0_wowotl.jpg',
	},
	{
		name: 'Smartphones',
		price: 39999,
		vat: 1199,
		itemsInStock: 69,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644901587/samples/ecommerce/6466005_sd_jmsclu.jpg',
	},
	{
		name: 'Undies',
		price: 999,
		vat: 29,
		itemsInStock: 129,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644901753/samples/ecommerce/811UWQmHkSS._AC_UY445__rihooe.jpg',
	},
	{
		name: 'Boxers',
		price: 999,
		vat: 29,
		itemsInStock: 119,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902014/samples/ecommerce/81ImywNKf_L._AC_UX385__uvdpu5.jpg',
	},
	{
		name: 'Drinks',
		price: 4299,
		vat: 29,
		itemsInStock: 206,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644901961/samples/ecommerce/feb_art_whiskeys-768x512_gzaeya.jpg',
	},
	{
		name: 'Socks',
		price: 299,
		vat: 29,
		itemsInStock: 603,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902075/samples/ecommerce/socks-1631103779.jpg_myt5ec.jpg',
	},
	{
		name: 'Pillow',
		price: 2389,
		vat: 29,
		itemsInStock: 56,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902158/Marriott-The-Marriott-Pillow-MAR-108-L_xlrg_vnw53j.jpg',
	},
	{
		name: 'Jacket',
		price: 2389,
		vat: 29,
		itemsInStock: 56,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1646921525/Quilted_Pack_Jacket_ybtlg2_f8ygmk.jpg',
	},
	{
		name: 'Undies',
		price: 999,
		vat: 29,
		itemsInStock: 129,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644901753/samples/ecommerce/811UWQmHkSS._AC_UY445__rihooe.jpg',
	},
	{
		name: 'Socks',
		price: 299,
		vat: 29,
		itemsInStock: 603,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902075/samples/ecommerce/socks-1631103779.jpg_myt5ec.jpg',
	},
	{
		name: 'Pillow',
		price: 2389,
		vat: 29,
		itemsInStock: 56,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902158/Marriott-The-Marriott-Pillow-MAR-108-L_xlrg_vnw53j.jpg',
	},
	{
		name: 'Jacket',
		price: 2389,
		vat: 29,
		itemsInStock: 56,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1646921525/Quilted_Pack_Jacket_ybtlg2_f8ygmk.jpg',
	},
];
