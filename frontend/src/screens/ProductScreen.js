import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import { Row, Col, Image, ListGroup, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'

function ProductScreen() {

  const [qty, setQty] = useState(1)

  const params = useParams()
  const productId = params.id

  const navigate  = useNavigate()

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails
  console.log(product)

  useEffect(() => {
    dispatch(listProductDetails(productId))
  }, [dispatch, productId])

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`)
  }

  return (
    <div>
      <Link className='links my-3' to='/home'><i className="fa-solid fa-left-long"></i> Back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h4>{product.name}</h4>
          <ListGroup variant=''>
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
            <ListGroup.Item>
              <Row>
                <Col><strong>Stock:</strong></Col>
                <Col>{product.countInStock < 1 ? 'Out of Stock' : `In Stock (${product.countInStock})`}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className='my-3'>
        <h4>ADD TO CART</h4>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price</Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>

            {product.countInStock > 0 ? (
              <ListGroupItem>
                <Row>
                <Col>Quantity</Col>
                <Col>
                  <Form.Control
                    as='select'
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {
                        [...Array(product.countInStock).keys()].map((x) => (
                          <option value={x+1} key={x+1}>{x+1}</option>
                        ))
                      }
                    </Form.Control>
                </Col>
                </Row>
              </ListGroupItem>
            ) : (
              <ListGroupItem>
                <strong>You'll be Notified once in stock</strong>
              </ListGroupItem>
            )
            }
            <ListGroup.Item>
              <Button
                style={{width: '100%'}}
                className='bg'
                disabled={product.countInStock < 1}
                onClick={addToCartHandler}>Add to Cart</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
