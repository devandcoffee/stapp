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
  btnBack: {
    width: "25%",
    alignSelf: "left"
  },
  table: {
    minWidth: 700
  }
});

const PlayersList = ({
  classes,
  players,
  onCreate,
  onEdit,
  onDelete,
  onGoBack
}) => (
  <Paper className={classes.root}>
    <Button
      className={classes.btnCreate}
      variant="contained"
      onClick={onCreate}
    >
      New Player
    </Button>
    <Button className={classes.btnBack} variant="contained" onClick={onGoBack}>
      My Teams
    </Button>
    <Table className={classes.table}>
      <TableHeader columns={["name", "address", "birthday"]} />
      <TableBody
        data={players}
        onDelete={onDelete}
        onEdit={onEdit}
        parsers={{ time: ["birthday"] }}
        fields={["name", "address", "birthday"]}
      />
    </Table>
  </Paper>
);

PlayersList.defaultProps = {
  players: []
};

PlayersList.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      address: PropTypes.string,
      birthday: PropTypes.string,
      teamId: PropTypes.number
    })
  ),
  onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired
};

export default withStyles(styles)(PlayersList);
