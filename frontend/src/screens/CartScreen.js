import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

function CartScreen() {

  const params = useParams()
  const productId = params.id

  const location = useLocation()
  const searchParameters = new URLSearchParams(location.search)
  const qty = searchParameters.get('qty') ? searchParameters.get('qty') : ''

  console.log(productId, '...........', qty)

  const dispatch = useDispatch()

  return (
    <div>
      <h1>Cart</h1>
    </div>
  )
}

export default CartScreen
