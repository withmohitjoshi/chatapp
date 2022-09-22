import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuthenticationContextConsumer } from "../Context/UserAuthenticationContext";

const RedirectToHome = ({ children }) => {
  const { isLoggedIn } = UserAuthenticationContextConsumer();
  if (isLoggedIn === true) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RedirectToHome;
