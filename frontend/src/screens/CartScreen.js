import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'

function CartScreen() {

  const params = useParams()
  const productId = params.id

  const location = useLocation()
  const searchParameters = new URLSearchParams(location.search)
  const qty = searchParameters.get('qty') ? searchParameters.get('qty') : ''

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  console.log(cartItems)

  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch])

  return (
    <div>
      <h1>Cart</h1>
    </div>
  )
}

export default CartScreen
