import { useNavigate } from "react-router-dom";
import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavLink,
  NavDropdown,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logoutApiCall ] = useLogoutMutation();

  const logoutHandler = async () => {
     try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
     } catch (error) {
      console.log(error);
     }
  };

  return (
    <header>
      <Navbar style={{ backgroundColor: "#000" }} expand="md" collapseOnSelect>
        <Container>
          <LinkContainer style={{ color: "#fff" }} to="/">
            <NavbarBrand className="font-2" href="/">
              EcomHUB
            </NavbarBrand>
          </LinkContainer>
          <NavbarToggle aria-controls="basic-navbar-nav"></NavbarToggle>
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart" style={{ color: "#fff", fontWeight: "bold" }}>
                <NavLink>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </NavLink>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={<span style={{color: "white", fontWeight: "bold"}}>{userInfo.name}</span>}
                  id="userName"
                >
                  <LinkContainer to="/profile" className="profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler} className="profile">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login" style={{ color: "#fff" }}>
                  <NavLink>
                    <FaUser /> Sign In
                  </NavLink>
                </LinkContainer>
              )}
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
}
