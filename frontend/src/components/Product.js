import React from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Product({product}) {
  return (
    <Card className='my-4 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <CardImg src={product.image} variant='top'></CardImg>
        </Link>

        <CardBody>
            <Link to={`/product/${product._id}`}>
                <CardTitle as="div"><strong>{product.name}</strong></CardTitle>
            </Link>
            <CardText as="h3">
                ${product.price}
            </CardText>
        </CardBody>
    </Card>
  )
}
