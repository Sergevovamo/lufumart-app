import {
	AUTH_USER,
	USER_LOADING,
	AUTH_ERROR,
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	CURRENT_USER_ADDRESS,
	CURRENT_PUSH_TOKEN,
} from '../actions/types';

const initialState = {
	isAuthenticated: null,
	currentUserAddress: null,
	user: null,
	expoPushToken: null,
};

export default function AuthReducer(state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case AUTH_USER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case CURRENT_USER_ADDRESS:
			return {
				...state,
				currentUserAddress: action.payload,
			};
		case CURRENT_PUSH_TOKEN:
			return {
				...state,
				expoPushToken: action.payload,
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			};
		default:
			return state;
	}
}
