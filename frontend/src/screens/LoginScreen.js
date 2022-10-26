import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function LoginScreen() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/home'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
      if(userInfo) {
        navigate(redirect)
      }
    })

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
    }

  return (
    <div style={{marginTop: '3rem'}}>
      <h3 style={{textAlign: 'center'}}>Sign In</h3>
      {error && <Message severity='error' error={error}/>}
      {loading && <Loader/>}

      <Row className="justify-content-md-center my-auto">
        
        <Col md={6}>
            <Card className='body-bg'>
              <Form className='form-p' onSubmit={submitHandler}>
                <Form.Group className='form-m' controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    required
                    type='email'
                    placeholder='Enter email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>

                  </Form.Control>
                </Form.Group>
                <Button
                    type='submit'
                    className='bg'
                    style={{width: '100%', marginTop: '1.5rem'}}>
                    Sign In
                  </Button>
                <strong style={{textAlign: 'center'}}>
                  Are tou a new Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </strong>
              </Form>
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginScreen
