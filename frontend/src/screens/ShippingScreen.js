import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login, register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen() {

    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
      e.preventDefault()

      dispatch(saveShippingAddress({
        address, city, postalCode, country
      }))
      navigate('/payment')
    }

  return (
    <div style={{marginTop: '3rem'}}>
      <h3 style={{textAlign: 'center'}}>Enter Shipping Info</h3>
      {/* {error && <Message severity='error' error={error}/>}
      {loading && <Loader/>} */}
      <CheckoutSteps step1 step2/>

      <Row className="justify-content-md-center my-auto">
        
        <Col md={6}>
            <Card className='body-bg'>
              <Form className='form-p' onSubmit={submitHandler}>
                <Form.Group className='form-m' controlId='address'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}>

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='postalCode'>
                  <Form.Label>Postal code</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}>

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='country'>
                  <Form.Label>Enter Country</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}>

                  </Form.Control>
                </Form.Group>
                <Button
                    type='submit'
                    className='bg'
                    style={{width: '100%', marginTop: '1.5rem'}}>
                    Submit
                  </Button>
              </Form>
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ShippingScreen
