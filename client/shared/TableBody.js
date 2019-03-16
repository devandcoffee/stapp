import React from "react";
import PropTypes from "prop-types";

import { format } from "date-fns";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { FORMAT } from "../constants/dates";

const CustomTableBody = ({
  data,
  withActions,
  onEdit,
  onDelete,
  fields,
  parsers,
  renderCustomActions
}) => (
  <TableBody>
    {data.map(d => (
      <TableRow key={d.ID}>
        {Object.keys(d).map(k =>
          k !== "ID" && fields.includes(k) ? (
            <TableCell align="center" key={k}>
              {parsers.time.includes(k) ? format(new Date(d[k]), FORMAT) : d[k]}
            </TableCell>
          ) : null
        )}
        {withActions ? (
          <TableCell align="center">
            <IconButton aria-label="Edit" onClick={() => onEdit(d.ID)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete" onClick={() => onDelete(d.ID)}>
              <DeleteIcon />
            </IconButton>
            {renderCustomActions(d.ID)}
          </TableCell>
        ) : null}
      </TableRow>
    ))}
  </TableBody>
);

CustomTableBody.defaultProps = {
  data: [],
  withActions: true,
  omitId: true,
  parsers: {
    time: []
  },
  fields: [],
  renderCustomActions: () => null
};

CustomTableBody.propTypes = {
  data: PropTypes.array,
  omitId: PropTypes.bool,
  withActions: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string),
  parsers: PropTypes.shape({
    time: PropTypes.arrayOf(PropTypes.string)
  }),
  renderCustomActions: PropTypes.func
};

export default CustomTableBody;
