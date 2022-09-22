import {
  EMAIL_ERROR,
  EMAIL_PATTERN,
} from "../Constants/Constants";

export const localValidation = (e, dispatch) => {
  if (EMAIL_PATTERN.test(e.target[0].value) === false) {
    dispatch({
      type: EMAIL_ERROR,
      payload: "Please enter a valid email",
      hasError: true,
    });
    return true;
  } else {
    return false;
  }
};
