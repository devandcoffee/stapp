import React from "react";
import PropTypes from "prop-types";

import { TeamsList } from "../features/teams";
import SecurePage from "../hocs/SecurePage";
import { getTeams } from "../services/teams";

class Teams extends React.Component {
  static async getInitialProps({ query }) {
    const tournamentId = query.tournamentId;

    const res = await getTeams(tournamentId)
      .then(data => ({
        teams: data
      }))
      .catch(err => ({
        statusCode: err.status,
        message: err.statusText
      }));
    return { ...res, tournamentId };
  }

  render() {
    return (
      <TeamsList
        teams={this.props.teams}
        tournamentId={this.props.tournamentId}
      />
    );
  }
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      info: PropTypes.string,
      tournamentId: PropTypes.number
    })
  )
};
export default SecurePage(Teams);
