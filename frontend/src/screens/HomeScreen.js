import React from "react";
import { Row, Col } from "react-bootstrap";
import Products from "../products";
import Product from "../components/Product";

export default function HomeScreen() {
  return (
    <>
      <Row>
        {Products.map((product) => {
          return <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
          </Col>;
        })}
      </Row>
    </>
  );
}
