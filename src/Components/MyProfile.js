import React, { useEffect, useState } from "react";
import "../Styles/MyProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import AuthMethods from "../Utils/Firebase/AuthMethods";
function MyProfile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [verifyEmailLinkSent, setVerifyEmailLinkSent] = useState(false);
  useEffect(() => {
    const authMethods = new AuthMethods();
    setCurrentUser(authMethods.getCurrentUser());
  }, []);
  const editProfileButton = (
    <FontAwesomeIcon
      className="edit-btn"
      icon={faPenToSquare}
      onClick={() => {
        navigate("/my-profile/edit-profile");
      }}
    />
  );
  const dpIcon = <FontAwesomeIcon icon={faUser} className="dp-icon" />;
  if (!currentUser) {
    return null;
  }
  console.log(currentUser)
  return (
    <>
      <div className="my-profile">
        <header className="header">
          <h1>Profil Page</h1>
          {editProfileButton}
        </header>
        <section className="profile-picture-section">
          <div className="profile-picture">
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} className="dp-image" alt="dp" />
            ) : (
              dpIcon
            )}
          </div>
        </section>
        {verifyEmailLinkSent === true ? (
          <div className="success-msg">
            <p>Check {currentUser.email} to verify it</p>
          </div>
        ) : null}
        <section className="user-info-section">
          <label className="user-info-label">
            Name : <span>{currentUser.displayName}</span>
          </label>
          <label className="user-info-label">
            Email : <span>{currentUser.email}</span>
          </label>
          {currentUser.emailVerified === false ? (
            <button
              className="verify-email-btn"
              onClick={() => {
                const authMethods = new AuthMethods();
                authMethods.sentEmailVerificationLink();
                setVerifyEmailLinkSent(true);
                setTimeout(() => {
                  setVerifyEmailLinkSent(false);
                }, 5000);
              }}
            >
              Verify Email
            </button>
          ) : null}
        </section>
      </div>
    </>
  );
}

export default MyProfile;
