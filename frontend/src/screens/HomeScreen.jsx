import { React, useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, [])

  return (
    <>
      <Row>
        <h1 className="font-2">Welcome to EcomHUB</h1>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
