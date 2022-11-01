import React, { useEffect } from 'react'
import { listProducts } from '../actions/productActions'
import productList from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen() {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())

  }, [dispatch])

  return (
    <div>
      <ProductCarousel  />
      <h1>Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error' error={error} />
      ) : (
          <Row>
          {products.map(product => (
            <Col md={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default HomeScreen