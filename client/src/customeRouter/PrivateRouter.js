import React from "react";
import { Route } from "react-router-dom";

const PrivateRouter = ({ props }) => {
  const firstLogin = localStorage.getItem("firstLogin");
  return firstLogin ? <Route {...props} /> : <Route exact path="/" />;
};

export default PrivateRouter;
