import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavLink,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from 'react-redux';

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <header>
      <Navbar style={{backgroundColor: "#000"}} expand="md" collapseOnSelect>
        <Container> 
          <LinkContainer style={{color: '#fff'}} to="/">
            <NavbarBrand className="font-2" href="/">
              EcomHUB
            </NavbarBrand>
          </LinkContainer>
          <NavbarToggle aria-controls="basic-navbar-nav"></NavbarToggle>
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart" style={{ color: "#fff" }}>
                <NavLink>
                  <FaShoppingCart /> Cart
                  {
                    cartItems.length > 0 && (
                      <Badge style={{marginLeft: '5px'}}>
                        { cartItems.reduce((a, c) => a+c.qty, 0) }
                      </Badge>
                    )
                  }
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/login" style={{ color: "#fff" }}>
                <NavLink>
                  <FaUser /> Sign In
                </NavLink>
              </LinkContainer>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
}
