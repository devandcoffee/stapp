import React from "react";
import PropTypes from "prop-types";

import Router from "next/router";

import fetch from "isomorphic-unfetch";

import { setToken, unsetToken } from "../utils/auth";
import { logout, parseHash, getUserInfo } from "../utils/auth0";

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
          external_id: userProfile.sub,
          external_updated_at: userProfile.updated_at,
          email: userProfile.email,
          is_verified: userProfile.email_verified,
          name: userProfile.name,
          nickname: userProfile.nickname,
          picture: userProfile.picture
        };

        fetch("http://localhost:8080/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(response => {
            if (!response.ok) {
              throw Error(response.statusText);
            }

            Router.push("/");
          })
          .catch(() => {
            unsetToken();
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
