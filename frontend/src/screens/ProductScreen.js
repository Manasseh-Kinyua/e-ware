import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Rating from '../components/Rating'

function ProductScreen() {

  const params = useParams()
  const productId = params.id

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails
  console.log(product)

  useEffect(() => {
    dispatch(listProductDetails(productId))
  }, [dispatch, productId])

  return (
    <div>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h4>{product.name}</h4>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col><h5>Desc:</h5></Col>
              </Row>
              <Row>
              <Col>{product.description}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col><strong>Brand:</strong></Col>
                <Col>{product.brand}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col><strong>Category:</strong></Col>
                <Col>{product.category}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col><strong>Price:</strong></Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col><strong>Rating:</strong></Col>
                <Col><Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} /></Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
