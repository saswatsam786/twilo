import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavDropdown, Nav, Navbar, Container } from "react-bootstrap";
import logo from "../images/Logo.jpeg";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { logout } from "../redux/actions/authAction";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  const navLinks = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Message", icon: <ChatIcon />, path: "/message" },
    { label: "Discover", icon: <ExploreIcon />, path: "/discover" },
    { label: "Notify", icon: <FavoriteIcon />, path: "/discover" },
  ];
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [user, setUser] = useState(auth);

  console.log(auth);

  return (
    <Navbar bg="light" expand="lg" style={{ height: "65px" }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Logo src={logo} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            variant="pills"
            className="me-auto justify-content-end flex-grow-1 pe-3 align-items-center"
          >
            {navLinks.map((link, index) => (
              <li class="nav-item " key={index}>
                <Link className="nav-link" to={link.path}>
                  {link.icon}
                </Link>
              </li>
            ))}

            <NavDropdown
              title={<Avatar alt={user.user.username} src={user.user.avatar} />}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NavDropdown.Item>
                <Link
                  to={`/profile/${user.user._id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Profile
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <label
                  htmlFor="theme"
                  className="dropdown-item"
                  onClick={() =>
                    dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
                  }
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {theme ? "Light Mode" : "Dark Mode"}
                </label>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Logo = styled.img`
  object-fit: contain;
  max-width: 100px;
`;

export default Header;
