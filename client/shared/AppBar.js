import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Link from "next/link";

const styles = {
  root: {
    flexGrow: 1,
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  }
};

const SimpleAppBar = ({ classes, isLoggedIn }) => (
  <div className={classes.root}>
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          ST APP
        </Typography>
        {isLoggedIn && (
          <Button>
            <Link href="/tournaments">
              <a>Tournaments</a>
            </Link>
          </Button>
        )}
        {isLoggedIn && (
          <Button>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </Button>
        )}
        <Button>About</Button>

        {isLoggedIn ? (
          <Button color="primary" variant="outlined">
            <Link href="/logout">
              <a>Logout</a>
            </Link>
          </Button>
        ) : (
          <Button color="primary" variant="outlined">
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  </div>
);

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool
};

export default withStyles(styles)(SimpleAppBar);
