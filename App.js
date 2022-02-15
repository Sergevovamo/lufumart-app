import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import AppStore from './src/store/Store';
import RootStack from './src/stacks/RootStack';

const App = () => {
	return (
		<StoreProvider store={AppStore}>
			<RootStack />
		</StoreProvider>
	);
};

export default App;
