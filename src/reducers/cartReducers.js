import * as Types from './../constants/ActionTypes';
const localState = JSON.parse(localStorage.getItem('cartItems'));
const dataState = { cartItems: localState };
const defaultCartState = {
    cartItems: [],
    cartItem: {
        product: Object,
        count: Number
    }
}
const initialState = dataState.cartItems && dataState.cartItems.cartItems !== null ? dataState : defaultCartState;

const CartReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_TO_CART:
        case Types.UPDATE_TO_CART:
        case Types.RECEIVE_PRODUCTS:
        case Types.REMOVE_FROM_CART:
            return {
                cartItems: action.payload.cartItems
            };
        case Types.DELETE_IN_CART:
            return {
                cartItems: [],
            };
        default:
            return state
    }
}
export default CartReducers;