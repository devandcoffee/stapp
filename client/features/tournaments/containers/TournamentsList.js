import React from "react";
import PropTypes from "prop-types";
import TournamentsList from "../components/TournamentsList";
import Router from "next/router";
import { deleteTournament } from "../../../services/tournaments";

class TournamentsListContainer extends React.Component {
  handleCreateTournament = () => {
    Router.push("/tournamentForm");
  };

  handleEditTournament = id => {
    Router.push(`/tournamentForm?id=${id}`);
  };

  handleDeleteTournament = id => {
    deleteTournament(id)
      .then(() => Router.push("/tournaments"))
      .catch(err => console.error(err));
  };

  handleViewTeams = id => {
    Router.push(`/teams?tournamentId=${id}`);
  };

  render() {
    return (
      <TournamentsList
        tournaments={this.props.tournaments}
        onCreate={this.handleCreateTournament}
        onEdit={this.handleEditTournament}
        onDelete={this.handleDeleteTournament}
        onViewTeams={this.handleViewTeams}
      />
    );
  }
}

TournamentsListContainer.propTypes = {
  tournaments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.id,
      name: PropTypes.string,
      description: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string
    })
  ).isRequired
};

export default TournamentsListContainer;
