import { CART_ADD_ITEM } from "../constants/cartConstants";
import axios from "axios";
import { PRODUCT_DETAILS_ENDPOINT } from "../constants/apiConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`${PRODUCT_DETAILS_ENDPOINT}${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}