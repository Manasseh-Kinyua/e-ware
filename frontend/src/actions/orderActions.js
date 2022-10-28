import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import axios from 'axios';
import { BASE_URL, CREATE_ORDER_ENDPOINT, GET_ORDER_BY_ID_ENDPOINT } from "../constants/apiConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_CREATE_REQUEST
        })
    
        const {
            userLogin: {userInfo}
        } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.post(
            CREATE_ORDER_ENDPOINT,
            order,
            config
        )
    
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })
        localStorage.removeItem('cartItems')

    }catch(error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
    
        const {
            userLogin: {userInfo}
        } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.get(
            `${GET_ORDER_BY_ID_ENDPOINT}${id}`,
            config
        )
    
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const payOrder = (orderId) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_PAY_REQUEST
        })
    
        const {
            userLogin: {userInfo}
        } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const {data} = await axios.put(
            `${GET_ORDER_BY_ID_ENDPOINT}${orderId}/pay/`,
            {},
            config
        )
    
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}