import { SHOW_TABBAR, HIDE_TABBAR } from '../actions/types';

const initialState = {
	showTabbar: true,
};

export default function AppSettingsReducer(state = initialState, action) {
	switch (action.type) {
		case SHOW_TABBAR:
			return {
				...state,
				showTabbar: true,
			};
		case HIDE_TABBAR:
			return {
				...state,
				showTabbar: false,
			};
		default:
			return state;
	}
}
