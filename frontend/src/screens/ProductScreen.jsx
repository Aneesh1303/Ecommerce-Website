import React from "react";
import { useParams } from "react-router-dom";
import products from "../products";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

export default function ProductScreen() {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);
  console.log(product);

  return (
    <>
      <Link
        className="btn button font-2"
        to={"/"}
      >
        <FaArrowAltCircleLeft /> Previous
      </Link>
      <Row className="my-4">
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: ${product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
                <ListGroupItem>
                    <Row >
                        <Col className="font-2">Price:</Col>
                        <Col><strong>${product.price}</strong></Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row >
                        <Col className="font-2">Stock:</Col>
                        <Col><strong>{product.countInStock > 1 ? 'In Stock' : 'Out of Stock'}</strong></Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Button className="button font-2" disabled={product.countInStock === 0}>Add To Cart</Button>
                </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
