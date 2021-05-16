// import getData from './../Component/getdata';
// import getAll from './../Component/getdata';
import productApi from './../api/productApi';
import { FETCH_PRODUCT, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAIL } from './../constants/ActionTypes';
export const fetchProducts = (params) => async dispatch => {

    try {
        // const response = await getData.getAll();
        dispatch({
            type: FETCH_PRODUCT,
            payload: {
                loading: true,
                success: false
            }
        })
        const response = await productApi.getAllLocal(params);
        console.log(response)
        // dispatch({
        //     type: FETCH_PRODUCT,
        //     payload: response
        // })
        if (response) {
            dispatch({
                type: FETCH_PRODUCT_SUCCESS,
                payload: {
                    data: response,
                    loading: false,
                    success: true
                }
            })
        }
        else {
            dispatch({
                type: FETCH_PRODUCT_FAIL,
                payload: {
                    loading: false,
                    success: false
                }
            })
        }

    } catch (error) {
        dispatch({
            type: FETCH_PRODUCT_FAIL,
            payload: {
                loading: false,
                success: false
            }
        })
        console.log('Failed to fetch student list:', error)
    }
}