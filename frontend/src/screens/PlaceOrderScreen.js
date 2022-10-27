import React, { useEffect } from 'react'
import { Row, Col, Image, Button, ListGroup, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen() {

  const orderCreate = useSelector(state => state.orderCreate)
  const {order, error, success} = orderCreate

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  cart.shippingPrice = (cart.itemsPrice > 1000 ? 0 : 10).toFixed(2)
  cart.taxPrice = (0.082 * cart.itemsPrice).toFixed(2)
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

  useEffect(() => {
    if(success) {
      navigate(`/order/${order._id}`)
      dispatch({type: ORDER_CREATE_RESET})
    }
  }, [success])

  const placeOrder = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    }))
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
        <Col md={8}>
            <h4>Order Details</h4>
            <ListGroup variant='flush'>
              <ListGroup.Item>
              <h5><p>Shipping to: </p></h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{cart.shippingAddress.address},</p>
                <p>{cart.shippingAddress.city},</p>
                <p>{cart.shippingAddress.postalCode},</p>
                <p>{cart.shippingAddress.country},</p>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup className='mt-3' variant='flush'>
              <ListGroup.Item>
              <h5><p>Payment </p></h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Payment via:</strong>
                <p>{cart.paymentMethod}</p>
              </ListGroup.Item>
            </ListGroup>

            {cart.cartItems.length === 0 ? (
              <ListGroup className='mt-3' variant='flush'>
                <ListGroup.Item>
                  <Message severity='info' error='You have no order Items. Add items to cart in order to pay'/>
                </ListGroup.Item>
              </ListGroup>
            ) : (
              <ListGroup className='mt-3' variant='flush'>
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.product} fluid rounded />
                      </Col>
                      <Col md={4}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X {item.price} = ${(item.qty * item.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <h3>Order Summary</h3>
            <Card className='body-bg'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Items Price:</Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping Price:</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax Price:</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total Price:</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {error && (
                  <ListGroup.Item>
                    <Message severity='success' error={error}/>
                </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button style={{width: '100%'}} className='bg' onClick={placeOrder}>Place Order</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
