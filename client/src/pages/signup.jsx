import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/Logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/actions/authAction";

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

const SignUp = () => {
  const { auth, alert } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  // eslint-disable-next-line
  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    console.log(auth.token);
    if (auth.token) navigate("/");
  }, [auth, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(userData));
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
        <Form.Group className="mb-2" controlId="formBasicFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter fullname"
            onChange={handleChangeInput}
            name="fullname"
            value={fullname}
            style={{ backgroundColor: `${alert.fullname ? "#F7C5C5" : ""}` }}
          />
          <Form.Text className="text-muted" style={{ color: "red" }}>
            {alert.fullname ? alert.fullname : ""}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={handleChangeInput}
            name="username"
            value={username}
            style={{ backgroundColor: `${alert.username ? "#F7C5C5" : ""}` }}
          />
          <Form.Text className="text-muted">
            {alert.username ? alert.username : ""}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChangeInput}
            name="email"
            value={email}
            style={{ backgroundColor: `${alert.username ? "#F7C5C5" : ""}` }}
          />
          <Form.Text className="text-muted text-danger">
            {alert.email
              ? alert.email
              : "We'll never share your email with anyone else."}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Pass>
            <Form.Control
              type={typePass ? `text` : `password`}
              placeholder="Password"
              name="password"
              onChange={handleChangeInput}
              value={password}
              style={{
                backgroundColor: `${alert.username ? "#F7C5C5" : ""}`,
              }}
            />
            <Small onClick={() => setTypePass(!typePass)}>
              {!typePass ? "Show" : "Hide"}
            </Small>
          </Pass>
          <Form.Text className="text-muted text-danger">
            {alert.password ? alert.password : ""}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicCfPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Pass>
            <Form.Control
              type={typeCfPass ? `text` : `password`}
              placeholder="Confirm Password"
              name="cf_password"
              onChange={handleChangeInput}
              value={cf_password}
              style={{
                backgroundColor: `${alert.cf_password ? "#F7C5C5" : ""}`,
              }}
            />
            <Small onClick={() => setTypeCfPass(!typeCfPass)}>
              {!typeCfPass ? "Show" : "Hide"}
            </Small>
          </Pass>
          <Form.Text className="text-muted">
            {alert.cf_password ? alert.cf_password : ""}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        <LinkTo>
          Already have an account?{" "}
          <Link to="/" style={{ color: "crimson", textDecoration: "none" }}>
            Login Now
          </Link>
        </LinkTo>
      </Form>
    </AuthPage>
  );
};

export default SignUp;
