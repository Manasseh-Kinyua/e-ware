import React from 'react'
import { Row, Col, Image, Button, ListGroup, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

function PlaceOrderScreen() {

  const cart = useSelector(state => state.cart)

  cart.itemsPrice = 1
  cart.shippingPrice = 1
  cart.taxPrice = 1
  cart.totalPrice = 1

  const placeOrder = () => {
    console.log('order placed')
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
                <ListGroup.Item>
                  loading
                </ListGroup.Item>
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
