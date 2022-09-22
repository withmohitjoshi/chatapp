import React from "react";
import { Route, Routes } from "react-router-dom";
import "./Styles/App.css";
import "./Styles/SignUpLoginForgetPage.css";
import Home from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import ForgetPassword from "./Components/ForgetPassword";
import RedirectToHome from "./Routes/RedirectToHome";
import ProtectedRoute from "./Routes/ProtectedRoute";
import UserAuthenticationContextProvider from "./Context/UserAuthenticationContext";
import MyProfile from "./Components/MyProfile";
import EditProfile from "./Components/EditProfile";

function App() {
  return (
    <>
      <UserAuthenticationContextProvider>
        <Routes>
          <Route
            index
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-profile/edit-profile" element={<EditProfile />} />
          <Route
            path="login"
            element={
              <RedirectToHome>
                <LoginPage />
              </RedirectToHome>
            }
          />
          <Route
            path="signup"
            element={
              <RedirectToHome>
                <SignUpPage />
              </RedirectToHome>
            }
          />
          <Route
            path="forget-password"
            element={
              <RedirectToHome>
                <ForgetPassword />
              </RedirectToHome>
            }
          />
        </Routes>
      </UserAuthenticationContextProvider>
    </>
  );
}

export default App;
