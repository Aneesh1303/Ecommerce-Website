import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if(userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({...res, }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="font-2">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email" className="my-3">
          <FormLabel style={{fontWeight: 'bold'}}>Email Address</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="select shadow-none"
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="password" className="my-3">
          <FormLabel style={{fontWeight: 'bold'}}>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="select shadow-none"
          ></FormControl>

          <Button type="submit" className="button font-2 mt-3" disabled= { isLoading }>Sign In</Button>

          {isLoading && <Loader />}

          <Row className="py-3">
            <Col>
                New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </FormContainer>
  );
}
