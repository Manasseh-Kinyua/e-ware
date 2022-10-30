import React, { useEffect } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function ProductListScreen() {

    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {error: errorDelete, loading: loadingDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {error: errorCreate, loading: loadingCreate, success: successCreate, product: createdProduct} = productCreate

    const dispatch = useDispatch()

    useEffect(() => {
        if(!userInfo.isAdmin) {
            navigate('/profile')
        }

        if(successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
        
    }, [dispatch, userInfo, navigate, successDelete, successCreate])

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you eant to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

  return (
    <div>
      <Row>
        <Col>
            <h1>Products</h1>
        </Col>

        <Col style={{textAlign: 'right'}}>
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
                <Table striped responsive hover className='table-sm'>
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
                                <td>
                                    <Link to={`/admin/product/${product._id}/edit`}>
                                        <Button className='btn-sm bg'><i className="fa-sharp fa-solid fa-pen-to-square"></i></Button>
                                    </Link>
                                </td>
                                <td>
                                    <Button
                                        className='bg btn-sm'
                                        onClick={() => deleteHandler(product._id)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                    </Button>
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

export default ProductListScreen
