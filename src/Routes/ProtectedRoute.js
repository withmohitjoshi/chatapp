import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuthenticationContextConsumer } from "../Context/UserAuthenticationContext";
function ProtectedRoute({ children }) {
  const { isLoggedIn } = UserAuthenticationContextConsumer();
  if (isLoggedIn === false) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
