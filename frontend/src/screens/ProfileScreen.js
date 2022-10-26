import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getUserDetails, login, register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function ProfileScreen() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/home'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    console.log(user)

    useEffect(() => {
      if(!userInfo) {
        navigate('/login?redirect=/profile')
      }else {

        if(!user || !user.name || userInfo._id !== user._id) {
          dispatch(getUserDetails('profile'))
        } else {
          setName(user.name)
          setEmail(user.email)
        }

      }
    }, [dispatch, userInfo, user])

    const submitHandler = (e) => {
      e.preventDefault()

      if(password !== confirmPassword) {
        setMessage('Passwords do not match')
      }else {
        // dispatch(register(name, email, password))
      }
    }

  return (
    <div style={{marginTop: '3rem'}}>
      {error && <Message severity='error' error={error}/>}
      {loading && <Loader/>}

      <Row>
        
        <Col md={4}>
            <h3>Profile/Update</h3>
            <Card className='body-bg'>
                {message && <Message severity='info' error={message} />}
              <Form className='form-p' onSubmit={submitHandler}>
                <Form.Group className='form-m' controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>

                  </Form.Control>
                </Form.Group>
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
                <Form.Group className='form-m' controlId='confirmpassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    placeholder='Enter password again'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}>

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

export default ProfileScreen
