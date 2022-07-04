import {
	PRODUCT_LOADING,
	CHECK_OUT_ORDER,
	CALCULATE_SHIPPING_COST,
} from '../actions/types';

const initialState = {
	shippingFee: null,
	orderSuccess: null,
};

export default function ProductReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case CHECK_OUT_ORDER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				orderSuccess: action.payload,
			};
		case CALCULATE_SHIPPING_COST:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				shippingFee: action.payload,
			};
		default:
			return state;
	}
}
