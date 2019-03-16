import React from "react";

import { TeamForm } from "../features/teams";
import SecurePage from "../hocs/SecurePage";
import { getTeam } from "../services/teams";

class TeamFormPage extends React.Component {
  static async getInitialProps({ query }) {
    const res = await getTeam(query.id)
      .then(data => ({
        team: data
      }))
      .catch(err => ({
        statusCode: err.status,
        message: err.statusText
      }));
    return { ...res, tournamentId: query.tournamentId };
  }

  render() {
    const { team, tournamentId } = this.props;

    return <TeamForm team={team} tournamentId={tournamentId} />;
  }
}

export default SecurePage(TeamFormPage);
