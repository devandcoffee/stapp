import React from "react";

import { TournamentForm } from "../features/tournaments";
import SecurePage from "../hocs/SecurePage";
import { getTournament } from "../services/tournaments";

class TournamentFormPage extends React.Component {
  static async getInitialProps({ query }) {
    const res = await getTournament(query.id)
      .then(data => ({
        tournament: data
      }))
      .catch(err => ({
        statusCode: err.status,
        message: err.statusText
      }));
    return res;
  }

  render() {
    const { tournament } = this.props;

    return <TournamentForm tournament={tournament} />;
  }
}

export default SecurePage(TournamentFormPage);
