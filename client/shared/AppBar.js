import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    flexGrow: 1,
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  }
};

const SimpleAppBar = ({ classes }) => (
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
        <Button>Tournaments</Button>
        <Button>Profile</Button>
        <Button>About</Button>
        <Button color="primary" variant="outlined">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
