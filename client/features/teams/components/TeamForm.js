import React from "react";
import PropTypes from "prop-types";

import { Form, Field } from "react-final-form";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";

import { TextField } from "../../../shared/FormWrappers";

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

const Team = ({ classes, team, onSubmit, onCancel }) => (
  <Paper className={classes.root}>
    <Form
      onSubmit={onSubmit}
      initialValues={{
        ...team
      }}
      validate={() => ({})}
      render={({ handleSubmit, submitting, pristine, values }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Field name="name" component={TextField} type="text" label="Name" />
          <Field
            name="info"
            component={TextField}
            type="text"
            label="Information"
            multiline
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

Team.propTypes = {
  id: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  team: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    info: PropTypes.string,
    tournamendId: PropTypes.number
  })
};

export default withStyles(styles)(Team);
