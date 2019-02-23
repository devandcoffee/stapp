import React from "react";
import PropTypes from "prop-types";
import TournamentsList from "../components/TournamentsList";
import Router from "next/router";

class TournamentsListContainer extends React.Component {
  handleCreateTournament = () => {
    Router.push("/tournamentForm");
  };

  handleEditTournament = id => {
    Router.push("/tournamentForm", { query: { id: 1 } });
  };

  handleDeleteTournament = id => {
    console.log("deleting", id);
  };

  render() {
    return (
      <TournamentsList
        tournaments={this.props.tournaments}
        onCreate={this.handleCreateTournament}
        onEdit={this.handleEditTournament}
        onDelete={this.handleDeleteTournament}
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
