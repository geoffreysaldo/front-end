import { combineReducers} from 'redux';
import commandProductsReducer from './command-products/command_products.reducer';
import pokeBowlsReducer from './poke-bowls/poke_bowl.reducer';

export default combineReducers({
    commandProducts:commandProductsReducer,
    pokeBowls:pokeBowlsReducer
})