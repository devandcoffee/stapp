import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import AppBar from "./AppBar";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

const Layout = ({ classes, children, isLoggedIn }) => {
  return (
    <React.Fragment>
      <AppBar isLoggedIn={isLoggedIn} />
      <main className={classes.layout}>{children}</main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default withStyles(styles)(Layout);
