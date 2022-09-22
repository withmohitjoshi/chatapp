
import {
  EMAIL_ERROR,
  FIREBASE_ERROR,
  HAS_USER_REGISTERED,
  PASSWORD_ERROR,
  REPASSWORD_ERROR,
  UPDATE_EMAIL_FIELD,
  UPDATE_PASSWORD_FIELD,
  UPDATE_REPASSWORD_FIELD,
} from "../Utils/Constants/Constants";

export const signupReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_EMAIL_FIELD:
      return { ...state, email: action.payload };

    case UPDATE_PASSWORD_FIELD:
      return { ...state, password: action.payload };

    case UPDATE_REPASSWORD_FIELD:
      return { ...state, rePassword: action.payload };

    case EMAIL_ERROR:
      return {
        ...state,
        emailError: action.payload,
        hasError: action.hasError,
      };

    case PASSWORD_ERROR:
      return {
        ...state,
        passwordError: action.payload,
        hasError: action.hasError,
      };

    case REPASSWORD_ERROR:
      return {
        ...state,
        rePasswordError: action.payload,
        hasError: action.hasError,
      };

    case HAS_USER_REGISTERED:
      return {
        ...state,
        hasUserRegistered: action.payload,
      };

    case FIREBASE_ERROR:
      return {
        ...state,
        firebaseError: action.payload,
        hasError: action.hasError,
      };

    default:
      return state;
  }
};
