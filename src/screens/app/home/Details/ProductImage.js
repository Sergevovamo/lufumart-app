import React, { useState } from 'react';
import {
	View,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Animated,
	Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import ImageZoom from 'react-native-image-pan-zoom';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const ProductImage = ({ imageUrl }) => {
	const navigation = useNavigation();
	// const [scale, setScale] = useState(new Animated.Value(1));

	// const onPinchEvent = Animated.event(
	// 	[
	// 		{
	// 			nativeEvent: { scale: scale },
	// 		},
	// 	],
	// 	{
	// 		useNativeDriver: true,
	// 	}
	// );

	// const onPinchStateChange = (event) => {
	// 	if (event.nativeEvent.oldState === State.ACTIVE) {
	// 		Animated.spring(scale, {
	// 			toValue: 1,
	// 			useNativeDriver: true,
	// 		}).start();
	// 	}
	// };

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={{
				paddingTop: 5,
				width: '100%',
				paddingBottom: 15,
				paddingHorizontal: 10,
			}}
		>
			{imageUrl?.map((imgUrl, index) => {
				return (
					<TouchableOpacity
						key={index}
						onPress={() => navigation.navigate('ImageScreen')}
					>
						<View style={styles.product}>
							<View style={styles.imageContainer}>
								<Image
									source={{
										uri: `${imgUrl}`,
									}}
									style={styles.image}
								/>
								{/* <PinchGestureHandler
									key={index}
									onGestureEvent={onPinchEvent}
									onHandlerStateChange={onPinchStateChange}
								>
									<Animated.Image
										source={{
											uri: `${imgUrl}`,
										}}
										style={[styles.image, { transform: [{ scale: scale }] }]}
									/>
								</PinchGestureHandler> */}
								{/* <ImageZoom
									cropWidth={Dimensions.get('window').width}
									cropHeight={Dimensions.get('window').height}
									imageWidth={350}
									imageHeight={350}
								>
									<Image
										source={{
											uri: `${imgUrl}`,
										}}
										style={styles.image}
									/>
								</ImageZoom> */}
							</View>
						</View>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
};

export default ProductImage;

const styles = StyleSheet.create({
	product: {
		width: 300,
		height: 350,
		// marginHorizontal: 5,
		borderRadius: 10,
		backgroundColor: '#f3f7ff',
	},
	productZoom: {
		width: deviceWidth,
		height: deviceHeight,
		// marginHorizontal: 5,
		borderRadius: 10,
		backgroundColor: '#f3f7ff',
	},
	imageContainer: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		resizeMode: 'contain',
		width: '98%',
		height: '100%',
	},
});
