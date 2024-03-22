import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice.js";
import { clearCartItems } from "../slices/cartSlice.js";
import FormContainer from "../components/FormContainer.jsx";

export const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address || !cart.savePaymentMethod) {
      // Redirect only if one or both are missing
      navigate(cart.shippingAddress.address ? "/payment" : "/shipping");
    }
  }, [cart.savePaymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.savePaymentMethod,
        itemPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      
      dispatch(clearCartItems());
      console.log("res: ", res)
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.message || "An error occurred");
    }
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 step4 />
      </FormContainer>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2 className="font-2">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.country},{" "}
                {cart.shippingAddress.postalCode}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2 className="font-2">Payment Method</h2>
              <strong>Method: </strong>
              {cart.savePaymentMethod}
            </ListGroupItem>
            <ListGroupItem>
              <h2 className="font-2">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty.</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, ind) => (
                    <ListGroupItem key={ind}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2 className="font-2">Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="button font-2"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroupItem>
              <ListGroupItem>{isLoading && <Loader />}</ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
