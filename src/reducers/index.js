import { combineReducers } from "redux";
import CartReducers from './cartReducers';
import ProductReducers from './productReducers';
import MessageReducers from './messageReducers';

const rootReducers = combineReducers({
    cartReducers: CartReducers,
    productReducers: ProductReducers,
    messageReducers: MessageReducers
})
export default rootReducers