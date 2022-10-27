import React, { useEffect } from 'react'
import { Row, Col, Image, Button, ListGroup, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { GET_ORDER_BY_ID_ENDPOINT } from '../constants/apiConstants'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

function OrderScreen() {

  const params = useParams()
  const orderId = params.id
  console.log(orderId)
  console.log(`${GET_ORDER_BY_ID_ENDPOINT}${orderId}/pay/`)

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const orderDetails = useSelector(state => state.orderDetails)
  const {order, error, loading} = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const {success: successPay, error: errorPay, loading: loadingPay} = orderPay

  if(!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  }

  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    if(!userInfo) {
        navigate('/login')
    }
    if(!order || successPay || order._id !== Number(orderId)) {
        dispatch({type: ORDER_PAY_RESET})
        dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, userInfo, successPay])

  const paymentHandler = (orderId) => {
    dispatch(payOrder(orderId))
  }


  return (
    <div>
        {loading ? (
            <Loader/>
        ) : error ? (
            <Message severity='error' error={error} />
        ) : (
            <Row>
        <Col md={8}>
            <h4>Order Details</h4>
            <ListGroup variant='flush'>
              <ListGroup.Item>
              <h5><p>Shipping to: </p></h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Address: {order.shippingAddress.address},</p>
                <p>City: {order.shippingAddress.city},</p>
                <p>Postal Code: {order.shippingAddress.postalCode},</p>
                <p>Country: {order.shippingAddress.country},</p>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup variant='flush'>
              <ListGroup.Item>
              <h5><p>Customer: </p></h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Name: {order.user.name},</p>
                <p>Email: <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>,</p>
              </ListGroup.Item>
              {order.isDelivered ? (
                <ListGroup.Item>
                    <Message severity='seccess' error={`Delivered on ${order.deliveredAt}`} />
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                    <Message severity='error' error='Not Delivered' />
                </ListGroup.Item>
              )}
            </ListGroup>

            <ListGroup className='mt-3' variant='flush'>
              <ListGroup.Item>
              <h5><p>Payment </p></h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Payment via:</strong>
                <p>{order.paymentMethod}</p>
              </ListGroup.Item>
              {order.isPaid ? (
                <ListGroup.Item>
                    <Message severity='success' error={`Paid on ${order.paidAt}`}/>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                    <Message severity='error' error='Not Paid' />
                </ListGroup.Item>
              )}
            </ListGroup>

            {order.orderItems.length === 0 ? (
              <ListGroup className='mt-3' variant='flush'>
                <ListGroup.Item>
                  <Message severity='info' error='Order list is empty'/>
                </ListGroup.Item>
              </ListGroup>
            ) : (
              <ListGroup className='mt-3' variant='flush'>
                {order.orderItems.map((item) => (
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
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping Price:</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax Price:</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total Price:</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {loadingPay && (
                  <ListGroup.Item>
                    <Loader/>
                  </ListGroup.Item>
                )}
                {errorPay && (
                  <ListGroup.Item>
                    <Message severity='error' error={errorPay} />
                  </ListGroup.Item>
                )}
                {!order.isPaid ? (
                  <ListGroup.Item>
                    <Button style={{width: '100%'}} className='bg' onClick={paymentHandler}>Pay</Button>
                  </ListGroup.Item>
                ) : (
                  <Message severity='success' error='Paid' />
                )}
              </ListGroup>
            </Card>
        </Col>
      </Row>
        )}
      
    </div>
  )
}

export default OrderScreen
