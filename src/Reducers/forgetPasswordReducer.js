import {
  EMAIL_ERROR,
  FIREBASE_ERROR,
  PASSWORD_RESET_LINK_SENT,
  UPDATE_EMAIL_FIELD,
} from "../Utils/Constants/Constants";

export const forgetPassword = (state, action) => {
  switch (action.type) {
    case UPDATE_EMAIL_FIELD:
      return { ...state, email: action.payload };

    case EMAIL_ERROR:
      return {
        ...state,
        emailError: action.payload,
        hasError: action.hasError,
      };

    case FIREBASE_ERROR:
      return {
        ...state,
        firebaseError: action.payload,
        hasError: action.hasError,
      };

    case PASSWORD_RESET_LINK_SENT:
      return { ...state, passwordResetLinkSent: action.payload };

    default:
      return state;
  }
};
