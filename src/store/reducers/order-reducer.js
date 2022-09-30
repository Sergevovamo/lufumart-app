import {
	ORDER_LOADING,
	GET_CUSTOMER_ORDERS,
	CHECK_OUT_ORDER,
	CALCULATE_SHIPPING_COST,
} from '../actions/types';

const initialState = {
	shippingFee: null,
	orderSuccess: null,
	customerOrders: null,
};

export default function ProductReducer(state = initialState, action) {
	switch (action.type) {
		case ORDER_LOADING:
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
				shippingFee: null,
			};
		case CALCULATE_SHIPPING_COST:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				shippingFee: action.payload,
			};
		case GET_CUSTOMER_ORDERS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				customerOrders: action.payload,
			};
		default:
			return state;
	}
}
