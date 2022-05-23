import {
	View,
	Text,
	Image,
	Platform,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

import { Fontisto, MaterialIcons } from '@expo/vector-icons';

const Following = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={sellers}
				keyExtractor={(item, index) => `${item}-${index}`}
				style={{ flexGrow: 0 }}
				contentContainerStyle={{ padding: 5 }}
				showsVerticalScrollIndicator={false}
				renderItem={({ item: seller }) => {
					const { name, description, img, time } = seller;
					// console.log(name);

					return (
						<>
							<View style={styles.sellerContainer}>
								<View style={styles.popularText}>
									<Text style={{ fontSize: 10, color: '#fff' }}>
										POPULAR SELLERS
									</Text>
								</View>
								<View style={styles.sellerHeader}>
									<View style={styles.sellerInfo}>
										<Fontisto name="shopping-store" size={24} color="black" />
										<Text style={{ marginLeft: 5 }}>{name}</Text>
									</View>
									<TouchableOpacity style={styles.button}>
										<Text style={{ color: '#fff' }}>Follow</Text>
									</TouchableOpacity>
								</View>
								<View
									style={{
										paddingVertical: 1,
										borderBottomColor: 'gray',
										borderBottomWidth: 1,
									}}
								/>
								<View style={styles.imageContainer}>
									{img?.map((image, index) => (
										<Image
											key={index}
											source={{
												uri: `${image}`,
											}}
											style={styles.image}
										/>
									))}
								</View>
								<View
									style={{
										paddingVertical: 1,
										borderBottomColor: 'gray',
										borderBottomWidth: 1,
									}}
								/>
								<View style={styles.sellerFooter}>
									<View style={styles.footerTitle}>
										<Text>{description}</Text>
										<Text style={{ paddingVertical: 10 }}>{time}</Text>
									</View>
									<TouchableOpacity
										style={{ flexDirection: 'row', alignItems: 'center' }}
									>
										<MaterialIcons name="ios-share" size={20} color="#f68b1e" />
										<Text style={{ color: '#f68b1e' }}>SHARE</Text>
									</TouchableOpacity>
								</View>
							</View>
						</>
					);
				}}
			/>
		</View>
	);
};

export default Following;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fffff7',
	},
	sellerContainer: {
		padding: 3,
		marginBottom: 10,
		width: Platform.OS === 'ios' ? 330 : 300,
		height: 250,
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
		marginHorizontal: 8,
		backgroundColor: '#fff',
	},
	popularText: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 25,
		borderRadius: 7,
		width: '35%',
		top: 5,
		left: 1,
		zIndex: 10,
		backgroundColor: '#f68b1e',
	},
	sellerHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,
		paddingVertical: 5,
		paddingHorizontal: 5,
	},
	sellerInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		width: '25%',
		height: 45,
		backgroundColor: '#00ab55',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 7,
	},
	imageContainer: {
		marginVertical: 5,
		height: 100,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		resizeMode: 'contain',
		marginLeft: 5,
		width: '30%',
		height: '100%',
	},
	sellerFooter: {
		flexDirection: 'row',
		height: 60,
		justifyContent: 'space-between',
		paddingVertical: 5,
		paddingHorizontal: 5,
		alignItems: 'center',
	},
	footerTitle: {
		flexDirection: 'column',
	},
});

const sellers = [
	{
		name: 'Orbcomm System',
		description: 'Check the latest arrivals',
		img: [
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898640/samples/ecommerce/best-macbooks-roundup-header_xn5bs8.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898626/samples/ecommerce/hero-image.fill.size_1248x702.v1623391330_slbryj.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898570/samples/ecommerce/img-5704_ds77hk.jpg',
		],
		time: '1 hour ago',
	},
	{
		name: 'Qwen',
		description: 'Check the latest arrivals',
		img: [
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644896014/samples/ecommerce/91sLOZjNWHL._AC_SY450__zf6mkr.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644896010/samples/ecommerce/timbuk2_messenger_classic_messenger_bag_eco_monsoon_1108_4_1112_front_Timbuk2_ffffff80808100c3_1989_720x.progressive_lwwyoj.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644896005/samples/ecommerce/91i8aaaNcqL._AC_SY450__lnpyjz.jpg',
		],
		time: '53 min ago',
	},
	{
		name: 'SMB',
		description: 'Check the latest arrivals',
		img: [
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900266/samples/ecommerce/mt03614ag_nb_40_i_pkelzz.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900266/samples/ecommerce/mt03614ag_nb_40_i_pkelzz.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900359/samples/ecommerce/elan-75-years-hoodie-ptec7520-3d_yh4gid.png',
		],
		time: '37 min ago',
	},
	{
		name: 'Home Care',
		description: 'Check the latest arrivals',
		img: [
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902014/samples/ecommerce/81ImywNKf_L._AC_UX385__uvdpu5.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644901753/samples/ecommerce/811UWQmHkSS._AC_UY445__rihooe.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900067/samples/ecommerce/1620399389-best-amazon-dresses-for-women-ruffle-dress-1620399361.png_dt5c48.png',
		],
		time: '2 hours ago',
	},
	{
		name: 'Sonell Mart',
		description: 'Check the latest arrivals',
		img: [
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900190/samples/ecommerce/074c381a539a983b965c8d80f166cfc1_zlsk0r.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900151/samples/ecommerce/61lN36UMlmL._AC_UY395__xwstd1.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900109/samples/ecommerce/51WOGmwXm3L._AC_UY395__gpv5bo.jpg',
		],
		time: '3 hour ago',
	},
	{
		name: 'Bold Collection',
		description: 'Check the latest arrivals',
		img: [
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644899386/samples/ecommerce/61ZRU9gnbxL._AC_SL1500__b9ca4z.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644899634/samples/ecommerce/16-gb-Flash-disk_gjchnu.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644899363/samples/ecommerce/MWP22_navamo.jpg',
		],
		time: '20 sec ago',
	},
	{
		name: 'Sizzling Sounds',
		description: 'Check the latest arrivals',
		img: [
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644901587/samples/ecommerce/6466005_sd_jmsclu.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900631/samples/ecommerce/5b240ed61ae66253008b5228_iakair.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900599/samples/ecommerce/best-shoes-1610418585.jpg_u163oy.jpg',
		],
		time: '3 min ago',
	},
	{
		name: 'DTA Kenya',
		description: 'Check the latest arrivals',
		img: [
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902158/Marriott-The-Marriott-Pillow-MAR-108-L_xlrg_vnw53j.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902075/samples/ecommerce/socks-1631103779.jpg_myt5ec.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900217/samples/ecommerce/00000000_zi_8be594af-52ce-4fe5-9d04-6bb31a8cb06a_lbwzrk.jpg',
		],
		time: '1 day ago',
	},
];
