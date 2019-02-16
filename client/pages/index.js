/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  }
});

const Index = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="h4" gutterBottom>
      Home Page
    </Typography>
    <Typography gutterBottom>
      <Link href="/profile">
        <a>Go to the profile page</a>
      </Link>
    </Typography>
  </div>
);

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
