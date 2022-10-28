import React, { useEffect } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function ProductListScreen() {

    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList
    console.log(products)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!userInfo.isAdmin) {
            navigate('/profile')
        } else {
            dispatch(listProducts())
        }
    }, [dispatch, userInfo, navigate])

    const createProductHandler = () => {}

  return (
    <div>
      <Row>
        <Col>
            <h1>Products</h1>
        </Col>

        <Col className='align-items-right'>
            <Button className='mr-3 mr-0 bg' onClick={createProductHandler}>
                Create Product <i className='fas fa-plus'> </i>
            </Button>
        </Col>
      </Row>
      <Row>
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message severity='error' error={error} />
            ) : (
                <Table responsive hover className='table-sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Row>
    </div>
  )
}

export default ProductListScreen
