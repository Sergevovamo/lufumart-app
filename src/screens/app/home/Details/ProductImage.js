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
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const ProductImage = ({ imageUrl }) => {
	const [scale, setScale] = useState(new Animated.Value(1));

	const onPinchEvent = Animated.event(
		[
			{
				nativeEvent: { scale: scale },
			},
		],
		{
			useNativeDriver: true,
		}
	);

	const onPinchStateChange = (event) => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			Animated.spring(scale, {
				toValue: 1,
				useNativeDriver: true,
			}).start();
		}
	};

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
					<TouchableOpacity key={index}>
						<View style={styles.product}>
							<View style={styles.imageContainer}>
								<PinchGestureHandler
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
								</PinchGestureHandler>
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
		marginHorizontal: 15,
		borderRadius: 10,
		backgroundColor: '#f3f7ff',
	},
	imageContainer: {
		height: 350,
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
