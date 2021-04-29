// import getData from './../Component/getdata';
// import getAll from './../Component/getdata';
import productApi from './../api/productApi';
import { FETCH_PRODUCT } from './../constants/ActionTypes';
export const fetchProducts = (params) => async dispatch => {
    try {
        // const response = await getData.getAll();
        const response = await productApi.getAllLocal(params);
        console.log(response)
        dispatch({
            type: FETCH_PRODUCT,
            payload: response
        })
    } catch (error) {
        console.log('Failed to fetch student list:', error)
    }
}