import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { localValidation as loginLocalValidation } from "../Utils/Validations/loginValidation";
import { loginReducer } from "../Reducers/loginReducer";
import AuthMethods from "../Utils/Firebase/AuthMethods";
import {
  EMAIL_ERROR,
  FIREBASE_ERROR,
  PASSWORD_ERROR,
  UPDATE_EMAIL_FIELD,
  UPDATE_PASSWORD_FIELD,
} from "../Utils/Constants/Constants";
const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  firebaseError: "",
  hasError: false,
  validUser: false,
};
function LoginPage() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const localValidationHasError = loginLocalValidation(e, dispatch);
    if (localValidationHasError === false) {
      authMethods.loginUser(state.email, state.password, dispatch);
    }
  };

  return (
    <>
      <div className="page">
        <h1>Login Here</h1>
        {state.firebaseError.length > 0 ? (
          <div className="firebase-error">
            <p>
              {state.firebaseError.reduce((acc, curr) => acc + " " + curr, "")}
            </p>
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
          <input type={"submit"} value="Login" />
        </form>
        <Link to="/signup">Don't have an account?</Link>
        <Link to="/forget-password">Forget Password?</Link>
      </div>
    </>
  );
}

export default LoginPage;
