import React from "react";
import PropTypes from "prop-types";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";

const TableHeader = ({ columns, withActions }) => (
  <TableHead>
    <TableRow>
      {columns.map(c => (
        <TableCell align="center" key={c}>
          {c}
        </TableCell>
      ))}
      {withActions ? <TableCell align="center">Actions</TableCell> : null}
    </TableRow>
  </TableHead>
);

TableHeader.defaultProps = {
  columns: [],
  withActions: true
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  withActions: PropTypes.bool
};

export default TableHeader;
