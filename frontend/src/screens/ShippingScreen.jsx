import React, { useState } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import { CheckoutSteps } from "../components/CheckoutSteps";

export const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAdress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="font-2 mb-4">Shipping</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address" className="my-2">
          <FormLabel style={{ fontWeight: "bold" }}>Address</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Address"
            value={address}
            className="select"
            onChange={(e) => setAdress(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="city" className="my-2">
          <FormLabel style={{ fontWeight: "bold" }}>City</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter city"
            value={city}
            className="select"
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
          <FormGroup controlId="postalCode" className="my-2">
            <FormLabel style={{ fontWeight: "bold" }}>Postal Code</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              className="select"
              onChange={(e) => setPostalCode(e.target.value)}
            ></FormControl>
          </FormGroup>
        </FormGroup>
        <FormGroup controlId="country" className="my-2">
          <FormLabel style={{ fontWeight: "bold" }}>Country</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter country"
            value={country}
            className="select"
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" className="my-3 button font-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
