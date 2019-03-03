import React from "react";
import PropTypes from "prop-types";

import Router from "next/router";

import {
  setToken,
  unsetToken,
  setLocalUser,
  removeLocalUser
} from "../utils/auth";
import { logout, parseHash, getUserInfo } from "../utils/auth0";
import { login } from "../services/auth";

export default class extends React.Component {
  static propTypes = {
    url: PropTypes.object.isRequired
  };

  componentDidMount() {
    parseHash((err, result) => {
      if (err) {
        console.error("Something happened with the Sign In request");
        return;
      }

      setToken(result.idToken, result.accessToken);

      getUserInfo(result.accessToken, (err, userProfile) => {
        if (err) {
          console.error("Can not retrieve user info");
          return;
        }

        const body = {
          externalId: userProfile.sub,
          externalUpdatedAt: userProfile.updated_at,
          email: userProfile.email,
          isVerified: userProfile.email_verified,
          name: userProfile.name,
          nickname: userProfile.nickname,
          picture: userProfile.picture
        };

        login(body)
          .then(user => {
            setLocalUser(user.ID);
            Router.push("/");
          })
          .catch(() => {
            unsetToken();
            removeLocalUser();
            logout();
            Router.push("/");
          });
      });
    });
  }
  render() {
    return null;
  }
}
