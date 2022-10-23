import React, { useEffect } from 'react'
import { listProducts } from '../actions/productActions'
import productList from '../store'
import { useDispatch, useSelector } from 'react-redux'

function HomeScreen() {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  console.log(products)

  useEffect(() => {
    dispatch(listProducts())

  }, [dispatch])

  return (
    <div>
      <h1>All our Products</h1>
    </div>
  )
}

export default HomeScreen