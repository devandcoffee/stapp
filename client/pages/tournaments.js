import React from "react";
import PropTypes from "prop-types";

import { TournamentsList } from "../features/tournaments";
import SecurePage from "../hocs/SecurePage";
import { getTournaments } from "../services/tournaments";
import { getUserId } from "../utils/auth";

class Tournaments extends React.Component {
  static async getInitialProps(ctx) {
    const userId = getUserId(ctx.req);

    const res = await getTournaments(userId)
      .then(data => ({
        tournaments: data
      }))
      .catch(err => ({
        statusCode: err.status,
        message: err.statusText
      }));
    return res;
  }

  render() {
    return <TournamentsList tournaments={this.props.tournaments} />;
  }
}

Tournaments.propTypes = {
  tournaments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.id,
      name: PropTypes.string,
      description: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string
    })
  )
};
export default SecurePage(Tournaments);
