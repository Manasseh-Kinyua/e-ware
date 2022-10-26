import React, { useState } from 'react'
import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    console.log(shippingAddress)

    const [paymentMethod, setPaymentMethod] = useState('M-Pesa')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    if(!shippingAddress) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submitted')
    }

  return (
    <div>
        <CheckoutSteps step1 step2 step3/>
      <Row className="justify-content-md-center my-auto">
        <Col md={5}>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label
                        as='legend'>
                            Select a Payment Method
                        </Form.Label>
                    <Form.Check
                        type='radio'
                        label='M-pesa one tap'
                        id='mpesa'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>

                        </Form.Check>
                    <Button
                        className='bg'
                        type='submit'>
                        Continue
                    </Button>
                </Form.Group>
            </Form>
        </Col>
      </Row>
    </div>
  )
}

export default PaymentScreen
