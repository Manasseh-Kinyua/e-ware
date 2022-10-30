import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Row, Col, Button, Card } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen() {

    const navigate = useNavigate()

    const params = useParams()

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

    useEffect(() => {

        if(successUpdate) {

            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')

        } else {

            if(!product.name || product._id !== Number(params.id)) {
                dispatch(listProductDetails(Number(params.id)))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }

        }

    }, [dispatch, params.id, product, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateProduct({
            _id: params.id,
            name, price, image, brand, category, countInStock, description
        }))
    }

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Product/Edit</h3>

      <Row className="justify-content-md-center my-auto">
        
        <Col md={6}>
            <Card className='body-bg'>
              <Form className='form-p' onSubmit={submitHandler}>
                <Form.Group className='form-m' controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    >

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    >

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    >

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    >

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='countinstock'>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    required
                    type='number'
                    placeholder='Enter stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    >

                  </Form.Control>
                </Form.Group>
                <Form.Group className='form-m' controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    >

                  </Form.Control>
                </Form.Group>
                <Button
                    type='submit'
                    className='bg'
                    style={{width: '100%', marginTop: '1.5rem'}}>
                    Update
                  </Button>
              </Form>
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductEditScreen
