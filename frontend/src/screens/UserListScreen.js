import React, { useEffect } from 'react'
import { Table, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { deleteUser, listUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function UserListScreen() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/profile')
        }
    }, [dispatch, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message severity='error' error={error} />
      ) : (
        <Table responsive hover striped className='table-sm'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    {user.isAdmin ? (
                        <td><i className="fa-solid fa-check text-success"></i></td>
                    ) : (
                        <td><i className="fa-solid fa-xmark text-danger"></i></td>
                    )}
                    <td>
                        <Link to={`/admin/user/${user._id}/edit`}>
                            <Button className='btn-sm bg'><i className="fa-sharp fa-solid fa-pen-to-square"></i></Button>
                        </Link>
                    </td>
                    <td>
                        <Button
                            className='bg btn-sm'
                            onClick={() => deleteHandler(user._id)}>
                            <i className="fa-solid fa-trash"></i>
                        </Button>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
      )}
    </div>
  )
}

export default UserListScreen
