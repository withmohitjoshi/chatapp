import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { forgetPassword } from "../Reducers/forgetPasswordReducer";
import {
  EMAIL_ERROR,
  FIREBASE_ERROR,
  UPDATE_EMAIL_FIELD,
} from "../Utils/Constants/Constants";
import AuthMethods from "../Utils/Firebase/AuthMethods";
import { localValidation as forgetPasswordLocalValidation } from "../Utils/Validations/forgetPasswordValidation";
const initialState = {
  email: "",
  emailError: "",
  firebaseError: "",
  passwordResetLinkSent: false,
  hasError: false,
};
function ForgetPassword() {
  const [state, dispatch] = useReducer(forgetPassword, initialState);
  const [authMethods, setAuthMethods] = useState();
  useEffect(() => {
    setAuthMethods(new AuthMethods());
  }, []);
  useEffect(() => {
    dispatch({
      type: EMAIL_ERROR,
      payload: "",
      hasError: false,
    });
    dispatch({
      type: FIREBASE_ERROR,
      payload: "",
      hasError: false,
    });
  }, [state.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const localValidationHasError = forgetPasswordLocalValidation(e, dispatch);
    if (localValidationHasError === false) {
      authMethods.forgetPassword(state.email, dispatch);
    }
  };

  return (
    <>
      <div className="page">
        <h1>Forget Password</h1>
        {state.firebaseError.length > 0 ? (
          <div className="firebase-error">
            <p>
              {state.firebaseError.reduce((acc, curr) => acc + " " + curr, "")}
            </p>
          </div>
        ) : null}
        {state.passwordResetLinkSent === true ? (
          <div className="success-msg">
            <p>{`Reset link sent on ${state.email}. It may be in span`}</p>
          </div>
        ) : null}
        <form
          className="page-form"
          onSubmit={(e) => handleSubmit(e)}
          noValidate={true}
        >
          <input
            type={"email"}
            placeholder="Enter your email id"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: UPDATE_EMAIL_FIELD,
                payload: e.target.value.trim(),
              })
            }
          />
          <span id="email-error">{state.emailError}</span>
          <input type={"submit"} value="Forget Password" />
        </form>
        <Link to="/login">
          <p>Login here!</p>
        </Link>
      </div>
    </>
  );
}

export default ForgetPassword;
