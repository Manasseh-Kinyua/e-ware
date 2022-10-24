import React, { useEffect } from 'react'
import { listProducts } from '../actions/productActions'
import productList from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

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
      <h1>Products</h1>
      {loading ? (
        <h1>Loading!!!</h1>
      ) : error ? (
        <h1>Error</h1>
      ) : (
          <Row>
          {products.map(product => (
            <Col key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default HomeScreen