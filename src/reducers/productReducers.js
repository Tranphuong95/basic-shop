
import { FETCH_PRODUCT, FETCH_PRODUCT_FAIL, FETCH_PRODUCT_SUCCESS } from './../constants/ActionTypes';

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
            return { ...state, data: action.payload };
        case FETCH_PRODUCT_SUCCESS: {
            return {
                ...state,
                data: action.payload
            }
        }
        case FETCH_PRODUCT_FAIL: {
            return {
                ...state,
                data: action.payload
            }
        }
        default:
            return state
    }
}
export default ProductReducers;