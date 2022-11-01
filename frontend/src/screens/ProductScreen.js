import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { createProductReview, listProductDetails } from '../actions/productActions'
import { Row, Col, Image, ListGroup, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen() {

  const [qty, setQty] = useState(1)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const params = useParams()
  const productId = params.id

  const navigate  = useNavigate()

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails
  console.log(product.reviews)

  const productCreateReview = useSelector(state => state.productCreateReview)
  const {loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview} = productCreateReview

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    if(successCreateReview) {
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(productId))
  }, [dispatch, productId, successCreateReview])

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createProductReview(
      productId,
      {
        'rating': rating,
        'comment': comment,
      }
    ))
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
        <Col md={4}>
        <h4>Reviews</h4>
        {product.reviews.length === 0 && <Message severity='info' error='No reviews for this product yet' />}
        {product.reviews && product.reviews.map(review => (
          <ListGroup variant='flush' key={review._id}>
            <ListGroup.Item>
              <strong>@{review.name}</strong>
              <Rating value={review.rating} color={'#f8e825'} />
              <p>{review.createdAt.substring(0,10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          </ListGroup>
        ))}
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <h4>Write a Review</h4>
            {loadingCreateReview && <Loader />}
            {errorCreateReview && <Message severity='error' error={errorCreateReview} />}
            <ListGroup.Item>
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group>
                    <Row>
                      <Col md={4}><Form.Label>Rating</Form.Label></Col>
                      <Col md={8}>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className='mt-2'>
                    <Row>
                      <Col md={4}><Form.Label>Comment</Form.Label></Col>
                      <Col md={8}>
                        <Form.Control
                          as='textarea'
                          rows={2}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}>
                            
                          </Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                  <ListGroup.Item>
                    <Button
                      type='submit'
                      className='bg'
                      style={{width: '100%'}}>Review</Button>
                  </ListGroup.Item>
                </Form>
              ) : (
                <span>
                  <Message severity='warning' error='You need to login in order to write a review' />
                  <Link to='/login'>Login</Link>
                </span>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
