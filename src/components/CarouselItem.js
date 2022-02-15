import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CarouselItem = ({ item }) => {
	return (
		<View style={styles.cardView}>
			<Image style={styles.image} source={{ uri: item.url }} />
			<View style={styles.textView}>
				<Text style={styles.itemTitle}> {item.title}</Text>
				<Text style={styles.itemDescription}>{item.description}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardView: {
		flex: 1,
		width: width - 20,
		height: height / 3.5,
		backgroundColor: 'white',
		margin: 10,
		borderRadius: 10,
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

	textView: {
		position: 'absolute',
		bottom: 10,
		margin: 10,
		left: 5,
	},
	image: {
		width: width - 20,
		height: height / 3.5,
		borderRadius: 10,
	},
	itemTitle: {
		color: 'white',
		fontSize: 22,
		shadowColor: '#000',
		shadowOffset: { width: 0.2, height: 0.8 },
		shadowOpacity: 1,
		shadowRadius: 3,
		marginBottom: 5,
		fontWeight: 'bold',
		elevation: 3,
	},
	itemDescription: {
		color: 'white',
		fontSize: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0.2, height: 0.8 },
		shadowOpacity: 1,
		shadowRadius: 3,
		elevation: 5,
	},
});

export default CarouselItem;
