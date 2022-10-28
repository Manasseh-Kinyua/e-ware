import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Card, Button } from 'react-bootstrap'
import { getUserDetails, updateUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const navigate = useNavigate()

    const params = useParams()

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails
    console.log(user)

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, success: successUpdate, loading: loadingUpdate} = userUpdate
    console.log(user)

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        } else {
            if(!user || !user.name || user._id !== Number(params.id)) {
                dispatch(getUserDetails(params.id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, params.id, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateUser({
            _id: user._id,
            name,
            email,
            isAdmin
        }))
    }

  return (
    <div>
        <Link className='links my-3' to='/admin/userlist'><i className="fa-solid fa-left-long"></i> Back</Link>
        <Row className="justify-content-md-center my-auto">
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message severity='error' error={error} />
            ) : (
                <Col md={6}>
                    <h4>Edit User</h4>
                    <Card className='body-bg'>
                        <Form className='form-p' onSubmit={submitHandler}>
                            <Form.Group className='form-m' controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    value={name}
                                    type='text'
                                    onChange={(e) => setName(e.target.value)}>
                                        
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group className='form-m' controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={email}
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}>

                                    </Form.Control>
                            </Form.Group>
                            <Form.Group className='form-m' controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='set admin/not'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}>

                                    </Form.Check>
                            </Form.Group>
                            {loadingUpdate && <Loader/>}
                            {errorUpdate && <Message severity='warning' error={errorUpdate} />}
                            <Button
                                style={{width: '100%'}}
                                className='bg'
                                type='submit'>Update</Button>
                        </Form>
                    </Card>
                </Col>
            )}
        </Row>
    </div>
  )
}

export default UserEditScreen
