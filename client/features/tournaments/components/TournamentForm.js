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

const TournamentForm = ({ classes, tournament, onSubmit, onCancel }) => (
  <Paper className={classes.root}>
    <Form
      onSubmit={onSubmit}
      initialValues={tournament}
      validate={() => ({})}
      render={({ handleSubmit, submitting, pristine, values }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Field name="name" component={TextField} type="text" label="Name" />
          <Field
            name="description"
            component={TextField}
            type="text"
            label="Description"
            multiline
          />
          <Field
            name="startDate"
            component={TextField}
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
          />
          <Field
            name="endDate"
            component={TextField}
            type="date"
            label="End Date"
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

TournamentForm.propTypes = {
  id: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  tournament: PropTypes.shape({
    id: PropTypes.id,
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  })
};

export default withStyles(styles)(TournamentForm);
