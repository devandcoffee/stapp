/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import DefaultPage from "../hocs/DefaultPage";

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  }
});

const Index = ({ classes, isLoggedIn }) => (
  <div className={classes.root}>
    <Typography variant="h4" gutterBottom>
      Home Page
    </Typography>

    {isLoggedIn ? (
      <Link href="/profile">
        <a>Go to the profile page</a>
      </Link>
    ) : (
      <Typography gutterBottom>You are not logged in yet</Typography>
    )}
  </div>
);

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool
};

export default DefaultPage(withStyles(styles)(Index));
