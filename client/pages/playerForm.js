import React from "react";

import { PlayerForm } from "../features/players";
import SecurePage from "../hocs/SecurePage";
import { getPlayer } from "../services/players";

class PlayerFormPage extends React.Component {
  static async getInitialProps({ query }) {
    const res = await getPlayer(query.id)
      .then(data => ({
        player: data
      }))
      .catch(err => ({
        statusCode: err.status,
        message: err.statusText
      }));
    return { ...res, teamId: query.teamId };
  }

  render() {
    const { player, teamId } = this.props;

    return <PlayerForm player={player} teamId={teamId} />;
  }
}

export default SecurePage(PlayerFormPage);
