import React from "react";
import fetch from "isomorphic-unfetch";

import { TournamentForm } from "../features/tournaments";
import SecurePage from "../hocs/SecurePage";
import { getUserId } from "../utils/auth";

class TournamentFormPage extends React.Component {
  static async getInitialProps({ query }) {
    const res = await fetch(
      `http://localhost:8080/api/users/${1}/tournaments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => ({
        tournament: data,
        userId
      }))
      .catch(err => {
        console.error("there was an error fetching tournaments");
      });

    return res;
  }

  render() {
    const { tournament, userId } = this.props;

    return <TournamentForm userId={userId} tournament={tournament} />;
  }
}

export default SecurePage(TournamentFormPage);
