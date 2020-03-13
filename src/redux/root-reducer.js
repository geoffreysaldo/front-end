import { combineReducers} from 'redux';
import commandProductsReducer from './command-products/command_products.reducer';
import pokeBowlsReducer from './poke-bowls/poke_bowl.reducer';
import cartReducer from './cart/cart.reducer';
import entreeReducer from './entrees/entree.reducer';
import dessertReducer from './desserts/dessert.reducer';
import boissonsReducer from './boissons/boisson.reducer';
import formulesReducer from './formules/formule.reducer';
import etapeReducer from './etapes-inscription/etapes_inscription.reducer'
import emailReducer from './compte/email.reducer';

export default combineReducers({
    commandProducts:commandProductsReducer,
    pokeBowls:pokeBowlsReducer,
    cart:cartReducer,
    entrees:entreeReducer,
    desserts:dessertReducer,
    boissons:boissonsReducer,
    formules:formulesReducer,
    etape:etapeReducer,
    email:emailReducer
})