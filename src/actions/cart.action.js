
import *as Types from './../constants/ActionTypes';

export const addToCart = (product, quantity) => (dispatch, getState) => {
    console.log(getState().cartReducers.cartItems)
    const cartItems = getState().cartReducers.cartItems.slice()
    let alreadyExit = false;
    cartItems.forEach(x => {
        console.log(x.product.id)
        if (x.product.id === product.id) {
            alreadyExit = true;
            x.count += 1;
        }
    });
    if (!alreadyExit) {
        cartItems.push({ product, count: quantity })
    }
    dispatch({
        type: Types.ADD_TO_CART,
        payload: { cartItems }
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
// export const updateInCart = (product, quantity) => (dispatch, getState) => {
//     const cartItems = getState().cartReducers.cartItems.slice();
//     cartItems.forEach(x => {
//         window.console.log(x.product.id === product.id);
//         if (x.product.id === product.id) {
//             x.count = quantity;
//         }
//     });
//     dispatch({
//         type: Types.UPDATE_TO_CART,
//         payload: { cartItems },
//     });
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
// };

export const updateInCart = (product, quantity) => (dispatch, getState) => {
    const cartItems = getState().cartReducers.cartItems.slice();
    cartItems.forEach(x => {
        window.console.log(x.product.id === product.id);
        if (x.product.id === product.id) {
            x.count += quantity;
        }
    });
    dispatch({
        type: Types.UPDATE_TO_CART,
        payload: { cartItems },
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const removeFromCart = product => (dispatch, getState, filter) => {
    const cartItems = getState().cartReducers.cartItems.slice().filter(x => x.product.id !== product.id);
    console.log(cartItems)
    dispatch({
        type: Types.REMOVE_FROM_CART,
        payload: { cartItems },
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
//todo test xóa localstorage khi hoàn tất mua hàng 4/2/2021
export const deleteCart = () => dispatch => {
    localStorage.removeItem('cartItems');
    dispatch({
        type: Types.DELETE_IN_CART,
    });
};
