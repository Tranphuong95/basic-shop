
import { FETCH_PRODUCT } from './../constants/ActionTypes';

const initialState = {
    products: [],
    product: {
        id: Number,
        name: String,
        description: String,
        price: {
            oldPrice: Number,
            salePrice: Number,
            percentSale: Number
        },
        inventory: Number

    }
}
const ProductReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT:
            return { ...state, products: action.payload };
        default:
            return state
    }
}
export default ProductReducers;