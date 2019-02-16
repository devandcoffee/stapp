import React from "react";
import PropTypes from "prop-types";

import NotAuthorized from "../shared/NotAuthorized";
import DefaultPage from "./DefaultPage";

const securePageHoc = Page =>
  class SecurePage extends React.Component {
    static getInitialProps(ctx) {
      return Page.getInitialProps && Page.getInitialProps(ctx);
    }
    static propTypes = {
      isLoggedIn: PropTypes.bool.isRequired
    };
    render() {
      if (!this.props.isLoggedIn) {
        return <NotAuthorized />;
      }
      return <Page {...this.props} />;
    }
  };

export default Page => DefaultPage(securePageHoc(Page));
