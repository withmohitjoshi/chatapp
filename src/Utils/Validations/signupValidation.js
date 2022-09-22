import {
  EMAIL_ERROR,
  EMAIL_PATTERN,
  PASSWORD_ERROR,
  REPASSWORD_ERROR,
} from "../Constants/Constants";

export const localValidation = (e, dispatch) => {
  if (EMAIL_PATTERN.test(e.target[0].value) === false) {
    dispatch({
      type: EMAIL_ERROR,
      payload: "Please enter a valid email",
      hasError: true,
    });
    return true;
  } else if (e.target[1].value.length < 6) {
    dispatch({
      type: PASSWORD_ERROR,
      payload: "Length should be more than 6",
      hasError: true,
    });
    return true;
  } else if (e.target[1].value.includes(" ")) {
    dispatch({
      type: PASSWORD_ERROR,
      payload: "Spaces are not allowed",
      hasError: true,
    });
    return true;
  } else if (e.target[2].value !== e.target[1].value) {
    dispatch({
      type: REPASSWORD_ERROR,
      payload: "Password is not matching",
      hasError: true,
    });
    return true;
  } else {
    return false;
  }
};
