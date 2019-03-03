import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";

import TableHeader from "../../../shared/TableHeader";
import TableBody from "../../../shared/TableBody";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  btnCreate: {
    width: "25%",
    alignSelf: "right"
  },
  table: {
    minWidth: 700
  }
});

const TournamentsList = ({
  classes,
  tournaments,
  onCreate,
  onEdit,
  onDelete
}) => (
  <Paper className={classes.root}>
    <Button
      className={classes.btnCreate}
      variant="contained"
      onClick={onCreate}
    >
      New Tournament
    </Button>
    <Table className={classes.table}>
      <TableHeader
        columns={["name", "description", "start date", "end date"]}
      />
      <TableBody
        data={tournaments}
        onDelete={onDelete}
        onEdit={onEdit}
        fields={["name", "description", "startDate", "endDate"]}
        parsers={{ time: ["startDate", "endDate"] }}
      />
    </Table>
  </Paper>
);

TournamentsList.defaultProps = {
  tournaments: []
};

TournamentsList.propTypes = {
  classes: PropTypes.object.isRequired,
  tournaments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.id,
      name: PropTypes.string,
      description: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string
    })
  ),
  onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default withStyles(styles)(TournamentsList);
