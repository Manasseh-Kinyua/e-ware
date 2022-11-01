import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import { listTopRatedProducts } from '../actions/productActions'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'

function ProductCarousel() {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {loading, error, products} = productTopRated
    console.log(products)

    useEffect(() => {
        dispatch(listTopRatedProducts())
    }, [dispatch])

  return (loading ? <Loader/>
            : error ? <Message severity='error' error={error} />
            : (
                <Carousel
                    pause='hover'
                    className='bg'
                    >
                        {products.map(product => (
                            <Carousel.Item key={product._id}>
                                <Link to={`/product/${product._id}`}>
                                    <Image src={product.image} alt={product.name} fluid />
                                    <Carousel.Caption>
                                        {product.name} (${product.price})
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}
                </Carousel>
            )
  )
}

export default ProductCarousel
