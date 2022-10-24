import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import { Row, Col, Image, ListGroup, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'

function CartScreen() {

  const navigate = useNavigate()

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

  const removeFromCartHandler = (id) => {
    console.log('Removed', id)
  }

  const checkoutHandler = () => {
    navigate('/shipping')
  }

  return (
    <Row>
      <Link className='links' to='/home'><i className="fa-solid fa-left-long"></i> Back</Link>
      <Col md={8}>
        <h1>Cart</h1>
        {cartItems.length < 1 ? (
          <Message severity='info' error='Oooops!! Seems like you have not started shopping yet.'/>
        ) : (
          <ListGroup>
            {cartItems.map(item => (
              <ListGroup.Item className='body-bg cart-list glass-card' key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.product} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    <strong>${item.price}</strong>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(Number(item.product), Number(e.target.value)))}
                      >
                        {
                          [...Array(item.countInStock).keys()].map(x => (
                            <option value={x+1} key={x+1}>{x+1}</option>
                          ))
                        }
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button onClick={() => removeFromCartHandler(item.product)} className='bg'><i className="fa-solid fa-trash"></i></Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <h3>Cart Summary</h3>
        <Card>
          <ListGroup className='body-bg'>
            <ListGroup.Item>
              <Row>
                <Col><strong>Items SubTotal:</strong></Col>
                <Col>{cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} items</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col><strong>Price SubTotal:</strong></Col>
                <Col>${cartItems.reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Button
                  className='bg'
                  disabled={cartItems.length < 1}
                  onClick={checkoutHandler}>
                    Proceed to Checkout
                  </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
