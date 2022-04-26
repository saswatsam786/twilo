import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import SignUp from "./pages/signup";

import Home from "./pages/home";
import PageRender from "./customeRouter/PageRender";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";

import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "./components/Alert";
import Header from "./components/Header";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const firstLogin = localStorage.getItem("firstLogin");

  return (
    <BrowserRouter>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          <Routes>
            <Route exact path="/" element={auth.token ? <Home /> : <Login />} />
            <Route exact path="/signup" element={<SignUp />} />

            <Route
              exact
              path="/:page"
              element={firstLogin ? <PageRender /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/:page/:id"
              element={firstLogin ? <PageRender /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
