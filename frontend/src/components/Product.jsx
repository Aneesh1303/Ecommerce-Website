import React from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import '../assets/index.css'

export default function Product({product}) {
  return (
    <Card className='my-4 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <CardImg src={product.image} variant='top'></CardImg>
        </Link>

        <CardBody>
            <Link to={`/product/${product._id}`}>
                <CardTitle as="div" className='product-title'><strong>{product.name}</strong></CardTitle>
            </Link>
            <CardText as="div">
                <Rating value = {product.rating} text = {`${product.numReviews} reviews`}/>
            </CardText>
            <CardText className='mt-2' as="h3">
                <strong>${product.price}</strong>
            </CardText>
        </CardBody>
    </Card>
  )
}
