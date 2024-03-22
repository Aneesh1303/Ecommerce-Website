import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, FormLabel, FormCheck } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

export const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="font-2 mb-4">Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormLabel style={{ fontWeight: "bold" }}>Select Method</FormLabel>
        <Col>
          <FormCheck
            type="radio"
            className="my-2"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></FormCheck>
        </Col>
        <Button type="submit" className="button font-2 mt-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
