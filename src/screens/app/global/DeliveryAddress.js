import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_APIKEY } from '@env';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

import { currentUserAddress } from '../../../store/actions/auth-actions';

const DeliveryAddress = () => {
	const dispatch = useDispatch();
	const _map = useRef(null);
	const textInput = useRef(3);
	const mounted = useRef(false);

	const [position, setPosition] = useState({
		latitude: -4.3758745,
		longitude: 15.3396506,
		latitudeDelta: 0.008,
		longitudeDelta: 0.008,
	});

	useEffect(async () => {
		// set a clean up flag
		mounted.current = true;

		await checkPermission();
		await getLocation();

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, []);

	const checkPermission = async () => {
		const hasPermission = await Location.requestForegroundPermissionsAsync();
		if (hasPermission.status === 'granted') {
			const permission = await askPermission();
			return permission;
		}
		return true;
	};

	const askPermission = async () => {
		const permission = await Location.requestForegroundPermissionsAsync();
		return permission.status === 'granted';
	};

	const getLocation = async () => {
		mounted.current = true;
		try {
			const { granted } = await Location.requestForegroundPermissionsAsync();
			if (!granted) return;
			const {
				coords: { latitude, longitude },
			} = await Location.watchPositionAsync(
				{ accuracy: Location.Accuracy.High },
				(loc) => {
					const { latitude, longitude } = JSON.parse(
						JSON.stringify(loc.coords)
					);
					// console.log(loc);
					if (mounted.current) {
						setPosition((prevState) => ({
							...prevState,
							latitude: latitude,
							longitude: longitude,
							latitudeDelta: 0.008,
							longitudeDelta: 0.008,
						}));
					}
				}
			);
		} catch (err) {}
	};

	const goSearchedRegion = (searchedRegion) => {
		// complete this animation in 3 seconds

		_map.current.animateToRegion(searchedRegion, 3 * 1000);
	};

	return (
		<View style={{ flex: 1, paddingTop: 1, backgroundColor: '#fffff7' }}>
			<FlatList
				data={data}
				keyExtractor={(item, index) => `${item}-${index}`}
				style={{ flexGrow: 0 }}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{ padding: 5 }}
				showsVerticalScrollIndicator={false}
				renderItem={({ item: product }) => {
					return (
						<>
							<GooglePlacesAutocomplete
								nearbyPlacesAPI="GooglePlacesSearch"
								placeholder="Search your delivery location"
								listViewDisplayed={false}
								debounce={400}
								ref={textInput}
								minLength={2}
								enablePoweredByContainer={true}
								fetchDetails={true}
								autoFocus={true}
								textInputProps={{
									placeholderTextColor: 'gray',
									returnKeyType: 'search',
								}}
								styles={autoComplete}
								query={{
									key: GOOGLE_MAPS_APIKEY,
									language: 'en',
								}}
								onPress={(data, details = null) => {
									const searchedRegion = {
										latitude: details.geometry.location.lat,
										longitude: details.geometry.location.lng,
										latitudeDelta: 0.05,
										longitudeDelta: 0.05,
									};

									setPosition({
										latitude: details.geometry.location.lat,
										longitude: details.geometry.location.lng,
										address: data.description,
										coordinate: `${details.geometry.location.lat},${details.geometry.location.lng}`,
									});

									const address = {
										name: details.name,
										country: details.address_components,
										vicinity: details.vicinity,
										latitude: details.geometry.location.lat,
										longitude: details.geometry.location.lng,
										description: data.description,
									};
									// save user current address
									dispatch(currentUserAddress(address));
									goSearchedRegion(searchedRegion);
								}}
								onFail={(error) => console.error(error)}
							/>
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<MapView
									ref={_map}
									provider={PROVIDER_GOOGLE}
									style={styles.map}
									region={{
										latitude: position.latitude,
										longitude: position.longitude,
										latitudeDelta: 0.008,
										longitudeDelta: 0.008,
									}}
									showsUserLocation={true}
									followsUserLocation={true}
								>
									<Marker coordinate={position} />
								</MapView>
							</View>
						</>
					);
				}}
			/>
		</View>
	);
};

export default DeliveryAddress;

const styles = StyleSheet.create({
	map: {
		height: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.75 : SCREEN_HEIGHT * 0.7,
		marginVertical: 0,
		width: SCREEN_WIDTH * 0.92,
	},
});

const autoComplete = {
	textInput: {
		backgroundColor: '#f3f7ff',
		height: 50,
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		fontSize: 15,
		flex: 1,
		marginHorizontal: 15,
	},
	container: {
		paddingTop: 20,
		flex: 1,
	},

	textInputContainer: {
		flexDirection: 'row',
	},
};

// Test data so as to use Flatlist
const data = [
	// Have one object so as to render one map
	{
		long_name: 'Mombasa Road',
		short_name: 'Mombasa Road',
		types: ['route'],
	},
];
