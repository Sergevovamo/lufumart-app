import {
	PRODUCT_LOADING,
	GET_PRODUCT_CATEGORY,
	GET_PRODUCT_CATEGORIES,
	GET_PRODUCT_HOME_CATEGORIES,
	GET_PRODUCT_SUB_CATEGORIES_BY_CATEGORY,
	DELETE_PRODUCT_CATEGORY,
	GET_PRODUCT,
	GET_PRODUCTS,
	GET_PRODUCTS_SUB_CATEGORY,
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
	productHomeCategories: null,
	productSubCategoriesByCategory: null,
	product: null,
	products: null,
	getProductsBySubCategory: null,
	cartDetails: null,
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
				isAuthenticated: false,
				isLoading: false,
				productCategory: action.payload,
			};
		case GET_PRODUCT_CATEGORIES:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				productCategories: action.payload,
			};
		case GET_PRODUCT_HOME_CATEGORIES:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				productHomeCategories: action.payload,
			};
		case GET_PRODUCT_SUB_CATEGORIES_BY_CATEGORY:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				productSubCategoriesByCategory: action.payload,
			};
		case GET_PRODUCT:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				product: action.payload,
			};
		case GET_PRODUCTS:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				products: action.payload,
			};
		case GET_PRODUCTS_SUB_CATEGORY:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				getProductsBySubCategory: action.payload,
			};
		case GET_CART_PRODUCTS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				cartDetails: action.payload,
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
