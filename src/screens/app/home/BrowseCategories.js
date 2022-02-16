import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

const BrowseCategories = () => {
	return (
		<ScrollView style={{ backgroundColor: '#fffff7' }}>
			<View style={styles.container}>
				{ProductCategories?.map((item, index) => {
					const { name, imgUrl } = item;
					return (
						<TouchableOpacity key={index}>
							<View style={styles.product}>
								<View style={styles.imageContainer}>
									<Image
										source={{
											uri: `${imgUrl}`,
										}}
										style={styles.image}
									/>
								</View>
								<View
									style={{
										paddingVertical: 5,
										borderBottomColor: 'black',
										borderBottomWidth: 1,
									}}
								/>
								<View style={{ paddingHorizontal: 10, paddingTop: 5 }}>
									<Text style={{ fontWeight: 'bold' }}>{name}</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		</ScrollView>
	);
};

export default BrowseCategories;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	product: {
		width: 165,
		minHeight: 200,
		margin: 5,
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
		backgroundColor: '#fff',
	},
	imageContainer: {
		backgroundColor: '#fff',
		marginVertical: 5,
		height: 150,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		resizeMode: 'contain',
		width: '85%',
		height: '100%',
	},
});

const ProductCategories = [
	{
		name: 'Art',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644922368/smn_npr_choosingart_illo2_wide-47e947d97fe721a92e0bad06ac077bdb14262c70-s1100-c50_w3zbml.jpg',
	},
	{
		name: 'Antiques',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644922448/263753-1600x1030-antique-pocket-watch-identification_bf0vys.jpg',
	},
	{
		name: 'Baby',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644940019/samples/ecommerce/organic-cosmetic-children-for-bath-on-wooden-bakground-close-up-picture-id625379326_hjcisu.jpg',
	},
	{
		name: 'Books & Magazines',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644924085/samples/ecommerce/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source_xfcepa.jpg',
	},
	{
		name: 'Business & Industrial',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644940124/samples/ecommerce/header-industrial_sppbt1.jpg',
	},
	{
		name: 'Camera & Photo',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644924185/samples/ecommerce/5ff37ea336ace43815bf0c4a_car5k1_tup6e6.jpg',
	},
	{
		name: 'Cell Phones',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644901587/samples/ecommerce/6466005_sd_jmsclu.jpg',
	},
	{
		name: 'Accessories',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644939815/samples/ecommerce/5488972_TRUNK_OCT2020_MensAccessories_Blog_Header_kz3hov.jpg',
	},
	{
		name: 'Collectibles',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644939873/samples/ecommerce/SportsCollectibels750x375_dfrusc.jpg',
	},
	{
		name: 'Computers/Tablets',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898640/samples/ecommerce/best-macbooks-roundup-header_xn5bs8.jpg',
	},
	{
		name: 'Consumer Electronics',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644939843/samples/ecommerce/How_is_inventory_managed_for_consumer_electronics_fulfillment_3F_ksqzal.jpg',
	},
	{
		name: 'Crafts',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644939627/samples/ecommerce/1511294243-kids-crafts-collage.jpg_vnu1rf.jpg',
	},
	{
		name: 'Dolls & Bears',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644939591/samples/ecommerce/GUEST_bf56b9cc-2847-488d-8144-38c3f47fa0fb_meri8j.jpg',
	},
	{
		name: 'Movies & TV',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644924486/samples/ecommerce/netflix-logo_pca1o3.png',
	},
	{
		name: 'Health & Beauty',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900067/samples/ecommerce/1620399389-best-amazon-dresses-for-women-ruffle-dress-1620399361.png_dt5c48.png',
	},
	{
		name: 'Home & Garden',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644940068/samples/ecommerce/small-garden-ideas-1614032371_g1ob3p.jpg',
	},
	{
		name: 'Gift Cards & Coupons',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644924416/samples/ecommerce/gift-cards-tile_physical_dzymaq.png',
	},
	{
		name: 'Jewellery & Watches',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394315/samples/ecommerce/analog-classic.jpg',
	},
	{
		name: 'Sporting Goods',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644924359/samples/ecommerce/6078b11d0233a97e19c4bcec_shutterstock_442099849_l8wawk.jpg',
	},
	{
		name: 'Toys & Hobbies',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644922114/71AQdj-aJfL._AC_SL1500__shvpgw.jpg',
	},
	{
		name: 'Travel',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644896019/samples/ecommerce/gh-best-laptop-backpacks-1624630728_iytabw.jpg',
	},
	{
		name: 'Video Games & Consoles',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644921759/Sony-PlayStation-5_ss26a7.jpg',
	},
	{
		name: 'Everything Else',
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644921849/61GCDGT0D-L._AC_SX425__suy12y.jpg',
	},
];
