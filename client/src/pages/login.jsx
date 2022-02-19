import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/Logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authAction";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  // eslint-disable-next-line
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };
  return (
    <AuthPage>
      <Form
        style={{
          background: " #fff",
          maxWidth: "400px",
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "40px 25px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onSubmit={handleSubmit}
      >
        <H3>
          <Image src={Logo} alt="Logo" />
        </H3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChangeInput}
            name="email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Pass>
            <Form.Control
              type={typePass ? `text` : `password`}
              placeholder="Password"
              name="password"
              onChange={handleChangeInput}
            />
            <Small onClick={() => setTypePass(!typePass)}>
              {!typePass ? "Show" : "Hide"}
            </Small>
          </Pass>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <LinkTo>
          You don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "crimson", textDecoration: "none" }}
          >
            Register Now
          </Link>
        </LinkTo>
      </Form>
    </AuthPage>
  );
};

export default Login;

const AuthPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fdfdfd;
  position: relative;
`;

const H3 = styled.div.attrs(() => ({
  className: "text-uppercase text-center mb-4",
}))``;

const Image = styled.img``;

const Pass = styled.div`
  position: relative;
`;

const Small = styled.small`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.5;
`;

const LinkTo = styled.div`
  margin-bottom: 2px;
`;
