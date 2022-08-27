import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from '../screens/app/DrawerContent';
const Drawer = createDrawerNavigator();

import { SellStackScreen, ProductsStackScreen } from './AppScreenStack';

export const DrawerStackScreen = () => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
			}}
			drawerContent={(props) => <DrawerContent {...props} />}
			useLegacyImplementation={true}
		>
			<Drawer.Screen name="HomeDrawer" component={SellStackScreen} />
			<Drawer.Screen name="ProductsDrawer" component={ProductsStackScreen} />
			{/* <Drawer.Screen name="WalletDrawer" component={WalletStackScreen} />
					
					<Drawer.Screen name="LearnDrawer" component={LearnDrawer} />
					<Drawer.Screen name="AboutDrawer" component={AboutDrawer} /> */}
		</Drawer.Navigator>
	);
};
