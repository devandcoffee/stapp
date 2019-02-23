import React from "react";
import { getUserFromServerCookie, getUserFromLocalCookie } from "../utils/auth";

export default Page =>
  class Template extends React.Component {
    static async getInitialProps(ctx) {
      const loggedInUser = process.browser
        ? getUserFromLocalCookie()
        : getUserFromServerCookie(ctx.req);
      if (Page.getInitialProps) {
        const result = await Page.getInitialProps(ctx);
        return {
          ...result,
          loggedInUser,
          currentUrl: ctx.pathname,
          isLoggedIn: !!loggedInUser
        };
      }
      return {
        loggedInUser,
        currentUrl: ctx.pathname,
        isLoggedIn: !!loggedInUser
      };
    }

    render() {
      return <Page {...this.props} />;
    }
  };
