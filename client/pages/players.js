import React from "react";
import PropTypes from "prop-types";

import { PlayersList } from "../features/players";
import SecurePage from "../hocs/SecurePage";
import { getPlayers } from "../services/players";

class Players extends React.Component {
  static async getInitialProps({ query }) {
    const teamId = query.teamId;

    const res = await getPlayers(teamId)
      .then(data => ({
        players: data
      }))
      .catch(err => ({
        statusCode: err.status,
        message: err.statusText
      }));
    return { ...res, teamId, tournamentId: query.tournamentId };
  }

  render() {
    return (
      <PlayersList
        players={this.props.players}
        teamId={this.props.teamId}
        tournamentId={this.props.tournamentId}
      />
    );
  }
}

Players.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      address: PropTypes.string,
      birthday: PropTypes.string,
      teamId: PropTypes.number
    })
  )
};
export default SecurePage(Players);
