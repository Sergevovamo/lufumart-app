import React from 'react';
import {
	View,
	Text,
	Image,
	Platform,
	FlatList,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import * as Localization from 'expo-localization';

import { Fontisto, MaterialIcons } from '@expo/vector-icons';

const Following = () => {
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

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
									<Text
										style={{
											fontSize: 10,
											color: '#fff',
											textTransform: 'uppercase',
										}}
									>
										{/* POPULAR SELLERS */}
										{isEnglish ? 'Official Seller' : `Vendeur officiel`}
									</Text>
								</View>
								<View style={styles.sellerHeader}>
									<View style={styles.sellerInfo}>
										<Fontisto name="shopping-store" size={24} color="black" />
										<Text style={{ marginLeft: 5 }}>{name}</Text>
									</View>
									{/* <TouchableOpacity style={styles.button}>
										<Text style={{ color: '#fff' }}>Follow</Text>
									</TouchableOpacity> */}
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
										{/* <Text style={{ paddingVertical: 10 }}>{time}</Text> */}
									</View>
									{/* <TouchableOpacity
										style={{ flexDirection: 'row', alignItems: 'center' }}
									>
										<MaterialIcons name="ios-share" size={20} color="#f68b1e" />
										<Text style={{ color: '#f68b1e' }}>SHARE</Text>
									</TouchableOpacity> */}
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fffff7',
	},
	sellerContainer: {
		padding: 3,
		marginBottom: 10,
		width: Platform.OS === 'ios' ? width * 0.9 : width * 0.9,
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

let isEnglish = Localization.locale.slice(0, 2) === 'en';

const sellers = [
	{
		name: isEnglish ? 'Lufumart Online Store' : `Boutique en ligne Lufumart`,
		description: isEnglish
			? 'Check the latest arrivals'
			: `Vérifiez les derniers arrivages`,
		img: [
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898640/samples/ecommerce/best-macbooks-roundup-header_xn5bs8.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898626/samples/ecommerce/hero-image.fill.size_1248x702.v1623391330_slbryj.jpg',
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898570/samples/ecommerce/img-5704_ds77hk.jpg',
		],
		time: isEnglish ? '1 hour ago' : `Il ya 1 heure`,
	},
];
