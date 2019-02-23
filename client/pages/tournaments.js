import React from "react";
import PropTypes from "prop-types";

import fetch from "isomorphic-unfetch";
import { TournamentsList } from "../features/tournaments";
import SecurePage from "../hocs/SecurePage";

class Tournaments extends React.Component {
  static async getInitialProps() {
    const res = await fetch(`http://localhost:8080/api/tournaments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => ({
        tournaments: data
      }))
      .catch(err => {
        console.error("there was an error fetching tournaments");
      });

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
