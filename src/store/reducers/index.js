import { combineReducers } from 'redux';
import auth from './auth-reducer';
import products from './product-reducer';
import error from './error-reducer';

export default combineReducers({
	auth,
	products,
	error,
});
