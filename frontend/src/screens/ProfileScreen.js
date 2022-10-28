import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getUserDetails, login, register, updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

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

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
      if(!userInfo) {
        navigate('/login?redirect=/profile')
      }else {

        if(!user || !user.name || success || userInfo._id !== user._id) {
          dispatch({type: USER_UPDATE_PROFILE_RESET})
          dispatch(getUserDetails('profile'))
          dispatch(listMyOrders())
        } else {
          setName(user.name)
          setEmail(user.email)
        }

      }
    }, [dispatch, userInfo, user, success])

    const submitHandler = (e) => {
      e.preventDefault()

      if(password !== confirmPassword) {
        setMessage('Passwords do not match')
      }else {
        dispatch(updateUserProfile({
          'id': user._id,
          'name': name,
          'email': email,
          'password': password
        }))
      }
    }

  return (
    <div style={{marginTop: '3rem'}}>

      <Row>
        
        <Col md={4}>
            <h3>Profile/Update</h3>
            {error && <Message severity='error' error={error}/>}
            {loading && <Loader/>}
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
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='confirmpassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
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
        <Col md={8}>
          <h3>My Orders</h3>
          {loadingOrders ? (
            <Loader/>
          ) : errorOrders ? (
            <Message severity='error' error={errorOrders} />
          ) : (
            <Table responsive striped className='body-bg table-sm'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>${order.totalPrice}</td>
                  {order.isPaid ? (
                    <td>{order.paidAt.substring(0,10)}</td>
                  ) : (
                    <td><i className="fa-solid fa-xmark text-danger"></i></td>
                  )}
                  {order.isDelivered ? (
                    <td>{order.deliveredAt.substring(0,10)}</td>
                  ) : (
                    <td><i className="fa-solid fa-xmark text-danger"></i></td>
                  )}
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button className='bg btn-sm'>View</Button>
                    </Link>
                  </td>
                </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default ProfileScreen
