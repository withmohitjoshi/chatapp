import React from "react";
import { useNavigate } from "react-router";
import { UserAuthenticationContextConsumer } from "../Context/UserAuthenticationContext";
import AuthMethods from "../Utils/Firebase/AuthMethods";

function Home() {
  const { currentUser } = UserAuthenticationContextConsumer();
  const authMethods = new AuthMethods();
  const navigate = useNavigate();
  return (
    <div>
      Home {currentUser?.uid}
      <button
        onClick={() => {
          authMethods.logoutUser();
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          navigate("/my-profile");
        }}
      >
        My Profile
      </button>
    </div>
  );
}

export default React.memo(Home);
