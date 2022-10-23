import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from "../constants/productConstants";
import { PRODUCT_LIST_ENDPOINT } from "../constants/apiConstants"
import axios from axios

export const listProducts = () => async (dispatch) => {
    try {

        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        const {data} = await axios.get(PRODUCT_LIST_ENDPOINT)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}