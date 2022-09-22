import { doc, getFirestore, setDoc } from "firebase/firestore";
import { initializedApp } from "./InitializeApp";

class FirestoreMethods {
  async addNewUserToFirestore(newlyCreatedUser) {
    const db = getFirestore(initializedApp);
    const userData = {
      displayName: `USER_${newlyCreatedUser.uid.substring(0, 4).toUpperCase()}`,
      username: newlyCreatedUser.uid.substring(0, 8).toLowerCase(),
      email: newlyCreatedUser.email,
      emailVerified: newlyCreatedUser.emailVerified,
      accountCreationTime: newlyCreatedUser.metadata.creationTime,
      uid: newlyCreatedUser.uid,
      photoURL: newlyCreatedUser.photoURL,
      requestSent: [],
      requestPending: [],
      myFriends: [],
    };
    await setDoc(doc(db, "users", userData.uid), userData).catch((error) => {
      console.log(error);
    });
  }
}
export default FirestoreMethods;
