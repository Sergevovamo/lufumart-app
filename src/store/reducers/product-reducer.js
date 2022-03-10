import {
	PRODUCT_LOADING,
	GET_PRODUCT_CATEGORY,
	GET_PRODUCT_CATEGORIES,
	DELETE_PRODUCT_CATEGORY,
	GET_PRODUCT,
	GET_PRODUCTS,
	GET_CART_PRODUCTS,
	ADD_PRODUCT_TO_CART,
	REMOVE_PRODUCT_TO_CART,
	DECREASE_PRODUCT_TO_CART,
	CALCULATE_TOTAL,
} from '../actions/types';

const initialState = {
	isLoading: true,
	isAuthenticated: null,
	productCategory: null,
	productCategories: null,
	product: null,
	products: null,
	cartProducts: null,
	total: null,
};

export default function ProductReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_PRODUCT_CATEGORY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productCategory: action.payload,
			};
		case GET_PRODUCT_CATEGORIES:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productCategories: action.payload,
			};

		case GET_PRODUCT:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				product: action.payload,
			};
		case GET_PRODUCTS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				products: action.payload,
			};
		case GET_CART_PRODUCTS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				cartProducts: action.payload,
			};
		case ADD_PRODUCT_TO_CART:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				cartProducts: action.payload,
			};
		case REMOVE_PRODUCT_TO_CART:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				cartProducts: action.payload,
			};
		case DECREASE_PRODUCT_TO_CART:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				cartProducts: action.payload,
			};
		case CALCULATE_TOTAL:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				total: action.payload,
			};
		case DELETE_PRODUCT_CATEGORY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productCategories: state.productCategories?.filter(
					(product) => product._id !== action.payload
				),
			};
		default:
			return state;
	}
}
