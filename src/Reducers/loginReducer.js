import {
  EMAIL_ERROR,
  FIREBASE_ERROR,
  PASSWORD_ERROR,
  UPDATE_EMAIL_FIELD,
  UPDATE_PASSWORD_FIELD,
  VALID_USER,
} from "../Utils/Constants/Constants";

export const loginReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_EMAIL_FIELD:
      return { ...state, email: action.payload };

    case UPDATE_PASSWORD_FIELD:
      return { ...state, password: action.payload };

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

      case FIREBASE_ERROR:
      return {
        ...state,
        firebaseError: action.payload,
        hasError: action.hasError,
      };

      case VALID_USER:
        return {...state,validUser:action.payload}

    default:
      return state;
  }
};
