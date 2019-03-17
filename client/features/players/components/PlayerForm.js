import React from "react";
import PropTypes from "prop-types";

import { Form, Field } from "react-final-form";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";

import { TextField } from "../../../shared/FormWrappers";

import { getDateString } from "../../../utils/dates";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "50vh",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  form: {
    display: "flex",
    width: "50%",
    height: "80%",
    justifyContent: "space-around",
    flexDirection: "column",
    alignSelf: "center"
  },
  actions: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    marginTop: "25px"
  }
});

const Player = ({ classes, player, onSubmit, onCancel }) => (
  <Paper className={classes.root}>
    <Form
      onSubmit={onSubmit}
      initialValues={{
        ...player,
        birthday: player ? getDateString(player.birthday) : undefined
      }}
      validate={() => ({})}
      render={({ handleSubmit, submitting, pristine, values }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Field name="name" component={TextField} type="text" label="Name" />
          <Field
            name="address"
            component={TextField}
            type="text"
            label="Address"
          />
          <Field
            name="birthday"
            component={TextField}
            type="date"
            label="Birthday"
            InputLabelProps={{ shrink: true }}
          />

          <div className={classes.actions}>
            <Button onClick={onCancel} variant="contained">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting || pristine}
            >
              Create
            </Button>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  </Paper>
);

Player.propTypes = {
  id: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  player: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    birthday: PropTypes.string,
    teamId: PropTypes.number
  })
};

export default withStyles(styles)(Player);
