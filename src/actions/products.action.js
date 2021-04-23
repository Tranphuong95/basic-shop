// import getData from './../Component/getdata';
// import getAll from './../Component/getdata';
import productApi from './../api/productApi';
import { FETCH_PRODUCT } from './../constants/ActionTypes';
export const fetchProducts = () => async dispatch => {
    try {
        // const response = await getData.getAll();
        const response = await productApi.getAllLocal();
        dispatch({
            type: FETCH_PRODUCT,
            payload: response
        })
        window.console.log(response)
    } catch (error) {
        console.log('Failed to fetch student list:', error)
    }
}