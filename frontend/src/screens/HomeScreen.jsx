import { useGetProductsQuery } from "../slices/apiProductSlice";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function HomeScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>error?.data?.message || error.error</Message>
      ) : (
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
      )}
    </>
  );
}
