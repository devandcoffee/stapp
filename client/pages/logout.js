import React from "react";
import { logout } from "../utils/auth0";
import { unsetToken } from "../utils/auth";

export default class extends React.Component {
  componentDidMount() {
    unsetToken();
    logout();
  }
  render() {
    return null;
  }
}
