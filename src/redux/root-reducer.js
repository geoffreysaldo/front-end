import { combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import commandProductsReducer from './command-products/command_products.reducer';
import plateauxReducer from './plateaux/plateaux.reducer';
import cartReducer from './cart/cart.reducer';
import entreeReducer from './entrees/entree.reducer';
import dessertReducer from './desserts/dessert.reducer';
import boissonsReducer from './boissons/boisson.reducer';
import formulesReducer from './formules/formule.reducer';
import etapeReducer from './etapes-inscription/etapes_inscription.reducer'
import emailReducer from './compte/email.reducer';
import passwordReducer from './compte/password.reducer';
import informationInscriptionReducer from './retour-information-inscription/information_inscription.reducer';
import adminReducer from './admin/admin.reducer';

const persistConfig = 
    {
        key: 'root',
        storage,
        whitelist:['commandProducts']
    }

   
 const rootReducer = combineReducers({
    commandProducts:commandProductsReducer,
    plateaux:plateauxReducer,
    cart:cartReducer,
    entrees:entreeReducer,
    desserts:dessertReducer,
    boissons:boissonsReducer,
    formules:formulesReducer,
    etape:etapeReducer,
    email:emailReducer,
    password:passwordReducer,
    informations:informationInscriptionReducer,
    admin:adminReducer
})

export default persistReducer(persistConfig, rootReducer)