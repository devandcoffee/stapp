import React from "react";
import PropTypes from "prop-types";

import App, { Container } from "next/app";
import Head from "next/head";
import { MuiThemeProvider } from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../utils/getPageContext";

import Layout from "../shared/Layout";

class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <Layout isLoggedIn={pageProps.isLoggedIn}>
              <Component pageContext={this.pageContext} {...pageProps} />
            </Layout>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

MyApp.propTypes = {
  pageProps: PropTypes.shape({
    currenUrl: PropTypes.string,
    isLeggedIn: PropTypes.bool,
    loggedInUser: PropTypes.object
  })
};

export default MyApp;
