import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext } from "react";
import { initializedApp } from "../Utils/Firebase/InitializeApp";

export const UserAuthenticationContext = React.createContext();

class UserAuthenticationContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      currentUser: null,
    };
  }
  componentDidMount() {
    this.getAuthStateChanged();
  }
  getAuthStateChanged() {
    onAuthStateChanged(getAuth(initializedApp), (user) => {
      this.setState({ currentUser: user });
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }
  render() {
    const { isLoggedIn, currentUser } = this.state;
    return isLoggedIn !== null ? (
      <UserAuthenticationContext.Provider value={{ isLoggedIn, currentUser }}>
        {this.props.children}
      </UserAuthenticationContext.Provider>
    ) : null;
  }
}
export const UserAuthenticationContextConsumer = () => {
  return useContext(UserAuthenticationContext);
};
export default UserAuthenticationContextProvider;
