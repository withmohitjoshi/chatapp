import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { signupReducer } from "../Reducers/signupReducer";
import {
  EMAIL_ERROR,
  FIREBASE_ERROR,
  PASSWORD_ERROR,
  REPASSWORD_ERROR,
  UPDATE_EMAIL_FIELD,
  UPDATE_PASSWORD_FIELD,
  UPDATE_REPASSWORD_FIELD,
} from "../Utils/Constants/Constants";
import AuthMethods from "../Utils/Firebase/AuthMethods";
import { localValidation as signupLocalValidation } from "../Utils/Validations/signupValidation";
const initialState = {
  email: "",
  password: "",
  rePassword: "",
  emailError: "",
  passwordError: "",
  rePasswordError: "",
  firebaseError: "",
  hasError: false,
  hasUserRegistered: false,
};
function SignUpPage() {
  const [state, dispatch] = useReducer(signupReducer, initialState);
  const authMethods = new AuthMethods();
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
  useEffect(() => {
    dispatch({
      type: PASSWORD_ERROR,
      payload: "",
      hasError: false,
    });
    dispatch({
      type: FIREBASE_ERROR,
      payload: "",
      hasError: false,
    });
  }, [state.password]);
  useEffect(() => {
    dispatch({
      type: REPASSWORD_ERROR,
      payload: "",
      hasError: false,
    });
  }, [state.rePassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const localValidationHasError = signupLocalValidation(e, dispatch);
    if (localValidationHasError === false) {
      authMethods.createUser(state.email, state.password, dispatch);
    }
  };

  return (
    <>
      <div className="page">
        <h1>Signup Here</h1>
        {state.firebaseError.length > 0 ? (
          <div className="firebase-error">
            <p>{state.firebaseError.reduce((acc, curr) => acc + " " + curr)}</p>
          </div>
        ) : null}
        <form
          className="page-form"
          onSubmit={(e) => handleSubmit(e)}
          noValidate={true}
        >
          <input
            type={"email"}
            placeholder="Email id"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: UPDATE_EMAIL_FIELD,
                payload: e.target.value.trim(),
              })
            }
          />
          <span id="email-error">{state.emailError}</span>
          <input
            type={"password"}
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: UPDATE_PASSWORD_FIELD,
                payload: e.target.value,
              })
            }
          />
          <span id="password-error">{state.passwordError}</span>
          <input
            type={"password"}
            placeholder="ReEnter Password"
            value={state.rePassword}
            onChange={(e) =>
              dispatch({
                type: UPDATE_REPASSWORD_FIELD,
                payload: e.target.value,
              })
            }
          />
          <span id="reenter-password-error">{state.rePasswordError}</span>
          <input type={"submit"} value="Signup" />
        </form>
        <Link to="/login">
          <p>Already have an account?</p>
        </Link>
      </div>
    </>
  );
}

export default SignUpPage;
