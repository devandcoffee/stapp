/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import SecurePage from "../hocs/SecurePage";

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  }
});

const Profile = ({ classes, loggedInUser }) => (
  <div className={classes.root}>
    <Typography variant="h4" gutterBottom>
      Profile Page
    </Typography>
    <Typography gutterBottom>
      <Link href="/">
        <a>Go to the main page</a>
      </Link>
    </Typography>
    <pre>{JSON.stringify(loggedInUser, null, 2)}</pre>
  </div>
);

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object
};

export default SecurePage(withStyles(styles)(Profile));
