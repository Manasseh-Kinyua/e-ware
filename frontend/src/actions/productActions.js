import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_TOP_RATED_REQUEST,
    PRODUCT_TOP_RATED_SUCCESS,
    PRODUCT_TOP_RATED_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
} from "../constants/productConstants";
import { PRODUCT_LIST_ENDPOINT, PRODUCT_DETAILS_ENDPOINT, PRODUCT_DELETE_ENDPOINT, PRODUCT_CREATE_ENDPOINT, PRODUCT_UPDATE_ENDPOINT, CREATE_PRODUCT_REVIEW_ENDPOINT, PRODUCT_TOP_RATED_ENDPOINT } from "../constants/apiConstants"
import axios from 'axios'

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

export const listTopRatedProducts = () => async (dispatch) => {
    try {

        dispatch({
            type: PRODUCT_TOP_RATED_REQUEST
        })

        const {data} = await axios.get(PRODUCT_TOP_RATED_ENDPOINT)
        dispatch({
            type: PRODUCT_TOP_RATED_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_TOP_RATED_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })

        const {data} = await axios.get(`${PRODUCT_DETAILS_ENDPOINT}${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin:{userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(
            `${PRODUCT_DELETE_ENDPOINT}${id}/`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin:{userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            PRODUCT_CREATE_ENDPOINT,
            {},
            config
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin:{userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `${PRODUCT_UPDATE_ENDPOINT}${product._id}/`,
            product,
            config
        )

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin:{userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `${CREATE_PRODUCT_REVIEW_ENDPOINT}${productId}/review/`,
            review,
            config
        )

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}