import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

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

const TeamsList = ({
  classes,
  teams,
  onCreate,
  onEdit,
  onDelete,
  onViewPlayers,
  onGoBack
}) => (
  <Paper className={classes.root}>
    <Button
      className={classes.btnCreate}
      variant="contained"
      onClick={onCreate}
    >
      New Team
    </Button>
    <Button className={classes.btnBack} variant="contained" onClick={onGoBack}>
      My Tournaments
    </Button>
    <Table className={classes.table}>
      <TableHeader columns={["name", "info"]} />
      <TableBody
        data={teams}
        onDelete={onDelete}
        onEdit={onEdit}
        fields={["name", "info"]}
        renderCustomActions={id => (
          <IconButton aria-label="Teams" onClick={() => onViewPlayers(id)}>
            <PersonAddIcon />
          </IconButton>
        )}
      />
    </Table>
  </Paper>
);

TeamsList.defaultProps = {
  teams: []
};

TeamsList.propTypes = {
  classes: PropTypes.object.isRequired,
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      info: PropTypes.string,
      tournamentId: PropTypes.number
    })
  ),
  onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewPlayers: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired
};

export default withStyles(styles)(TeamsList);
