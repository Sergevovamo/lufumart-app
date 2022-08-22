import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import * as Localization from 'expo-localization';
import { GOOGLE_MAPS_APIKEY } from '@env';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const ASPECT_RATIO = deviceWidth / deviceHeight;

import { currentUserAddress } from '../../../store/actions/auth-actions';

const DeliveryAddress = () => {
	const dispatch = useDispatch();
	const _map = useRef(null);
	const textInput = useRef(3);
	const mounted = useRef(false);

	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const [position, setPosition] = useState({
		latitude: -4.3758745,
		longitude: 15.3396506,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0922 * ASPECT_RATIO,
	});

	useEffect(() => {
		// set a clean up flag
		mounted.current = true;
		(async () => {
			await checkPermission();
			await getLocation();
		})();

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
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 10000,
					distanceInterval: 80,
				},

				(loc) => {
					const { latitude, longitude } = JSON.parse(
						JSON.stringify(loc.coords)
					);

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
								placeholder={
									isEnglish
										? 'Search your delivery location'
										: 'Rechercher votre lieu de livraison'
								}
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
										latitudeDelta: 0.0043,
										longitudeDelta: 0.0034,
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
										latitudeDelta: 0.0922,
										longitudeDelta: 0.0922 * ASPECT_RATIO,
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
