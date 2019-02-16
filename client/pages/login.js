import React from "react";
import { authorize } from "../utils/auth0";
import DefaultPage from "../hocs/DefaultPage";

class Login extends React.Component {
  componentDidMount() {
    authorize();
  }
  render() {
    return null;
  }
}

export default DefaultPage(Login);
