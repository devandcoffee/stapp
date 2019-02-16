import React from "react";
import { getUserFromServerCookie, getUserFromLocalCookie } from "../utils/auth";

export default Page =>
  class Template extends React.Component {
    static async getInitialProps(ctx) {
      const loggedInUser = process.browser
        ? getUserFromLocalCookie()
        : getUserFromServerCookie(ctx.req);
      const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
      return {
        ...pageProps,
        loggedInUser,
        currentUrl: ctx.pathname,
        isLoggedIn: !!loggedInUser
      };
    }

    render() {
      return <Page {...this.props} />;
    }
  };
