import React from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignInAlt, FaTruck, FaCreditCard, FaShoppingCart } from 'react-icons/fa';

export const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-between mb-4">
      <NavItem>
        {step1 ? (
          <LinkContainer to="/login">
            <NavLink><h5 className="font-2 underline" style={{color: 'black'}}><FaSignInAlt /> Sign In</h5></NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled><h5 className="font-2"><FaSignInAlt /> Sign In</h5></NavLink>
        )}
      </NavItem>
      <NavItem>
        {step2 ? (
          <LinkContainer to="/shipping">
            <NavLink><h5 className="font-2" style={{color: 'black'}}><FaTruck /> Shipping</h5></NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled><h5 className="font-2"><FaTruck /> Shipping</h5></NavLink>
        )}
      </NavItem>
      <NavItem>
        {step3 ? (
          <LinkContainer to="/payment">
            <NavLink><h5 className="font-2" style={{color: 'black'}}><FaCreditCard /> Payment</h5></NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled><h5 className="font-2"><FaCreditCard /> Payment</h5></NavLink>
        )}
      </NavItem>
      <NavItem>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <NavLink><h5 className="font-2" style={{color: 'black'}}><FaShoppingCart /> Place Order</h5></NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled><h5 className="font-2"><FaShoppingCart /> Place Order</h5></NavLink>
        )}
      </NavItem>
    </Nav>
  );
};
