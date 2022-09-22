import { initializedApp } from "../Firebase/InitializeApp";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  FIREBASE_ERROR,
  HAS_USER_REGISTERED,
  PASSWORD_RESET_LINK_SENT,
  VALID_USER,
} from "../Constants/Constants";
import FirestoreMethods from "../Firebase/FirestoreMethods";
class AuthMethods {
  constructor() {
    this.auth = getAuth(initializedApp);
  }
  async createUser(email, password, dispatch) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          const firestoreMethods = new FirestoreMethods();
          this.updateUserProfile(userCredential.user, {
            displayName: `USER_${userCredential.user.uid
              .substring(0, 4)
              .toUpperCase()}`,
          });
          firestoreMethods.addNewUserToFirestore(userCredential.user);
          dispatch({
            type: HAS_USER_REGISTERED,
            payload: true,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: FIREBASE_ERROR,
          payload: error.message
            .slice(error.message.indexOf("/") + 1, error.message.indexOf(")"))
            .split("-"),
          hasError: true,
        });
      });
  }

  async loginUser(email, password, dispatch) {
    await setPersistence(this.auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          if (userCredential.user) {
            dispatch({
              type: VALID_USER,
              payload: true,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: FIREBASE_ERROR,
            payload: error.message
              .slice(error.message.indexOf("/") + 1, error.message.indexOf(")"))
              .split("-"),
            hasError: true,
          });
        });
    });
  }

  async forgetPassword(email, dispatch) {
    await sendPasswordResetEmail(this.auth, email)
      .then(() => {
        dispatch({
          type: PASSWORD_RESET_LINK_SENT,
          payload: true,
        });
      })
      .catch((error) => {
        dispatch({
          type: FIREBASE_ERROR,
          payload: error.message
            .slice(error.message.indexOf("/") + 1, error.message.indexOf(")"))
            .split("-"),
          hasError: true,
        });
      });
  }

  async logoutUser() {
    await signOut(this.auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async sentEmailVerificationLink() {
    await sendEmailVerification(this.auth.currentUser);
  }

  async updateUserProfile(currentUser, updatedProfile) {
    await updateProfile(currentUser, updatedProfile)
      .then(() => {
        console.log("profile updated");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getCurrentUser() {
    return getAuth(initializedApp).currentUser;
  }
}
export default AuthMethods;
