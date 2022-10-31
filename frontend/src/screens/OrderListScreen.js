import React, { useEffect } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

function OrderListScreen() {

    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderList = useSelector(state => state.orderList)
    const {error, loading, orders} = orderList

    const dispatch = useDispatch()

    useEffect(() => {
       if(userInfo && userInfo.isAdmin) {
        dispatch(listOrders())
       } else {
        navigate('/profile')
       }
        
    }, [dispatch, userInfo, navigate])

    const deleteHandler = () => {}

  return (
    <div>
      <Row>
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message severity='error' error={error} />
            ) : (
                <Table striped responsive hover className='table-sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
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
                                        <Button className='btn-sm bg'>Details</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Row>
    </div>
  )
}

export default OrderListScreen
