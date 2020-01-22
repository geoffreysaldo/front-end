import { combineReducers} from 'redux';
import commandProductsReducer from './command-products/command_products.reducer';

export default combineReducers({
    commandProducts:commandProductsReducer
})