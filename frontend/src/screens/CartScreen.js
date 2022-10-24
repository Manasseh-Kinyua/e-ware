import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, Link } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap'
import Message from '../components/Message'

function CartScreen() {

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

  return (
    <Row>
      <Link className='links' to='/home'><i className="fa-solid fa-left-long"></i> Back</Link>
      <Col md={9}>
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
    </Row>
  )
}

export default CartScreen
