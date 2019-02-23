import React from "react";
import PropTypes from "prop-types";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const CustomTableBody = ({ data, withActions, onEdit, onDelete }) => (
  <TableBody>
    {data.map(d => (
      <TableRow key={d.id}>
        {Object.keys(d).map(k =>
          k !== "id" ? (
            <TableCell align="center" key={k}>
              {d[k]}
            </TableCell>
          ) : null
        )}
        {withActions ? (
          <TableCell align="center">
            <IconButton aria-label="Edit" onClick={() => onEdit(d.id)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete" onClick={() => onDelete(d.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        ) : null}
      </TableRow>
    ))}
  </TableBody>
);

CustomTableBody.defaultProps = {
  data: [],
  withActions: true,
  omitId: true
};

CustomTableBody.propTypes = {
  data: PropTypes.array,
  omitId: PropTypes.bool,
  withActions: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CustomTableBody;
