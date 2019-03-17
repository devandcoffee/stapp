import React from "react";
import PropTypes from "prop-types";
import TeamsList from "../components/TeamsList";
import Router from "next/router";
import { deleteTeam } from "../../../services/teams";

class TeamsListContainer extends React.Component {
  handleCreateTeam = () => {
    const { tournamentId } = this.props;
    Router.push(`/teamForm?tournamentId=${tournamentId}`);
  };

  handleEditTeam = id => {
    const { tournamentId } = this.props;
    Router.push(`/teamForm?id=${id}&tournamentId=${tournamentId}`);
  };

  handleDeleteTeam = id => {
    const { tournamentId } = this.props;
    deleteTeam(id)
      .then(() => Router.push(`/teams?tournamentId=${tournamentId}`))
      .catch(err => console.error(err));
  };

  handleViewPlayers = id => {
    Router.push(`/players?teamId=${id}`);
  };

  render() {
    return (
      <TeamsList
        teams={this.props.teams}
        onCreate={this.handleCreateTeam}
        onEdit={this.handleEditTeam}
        onDelete={this.handleDeleteTeam}
        onViewPlayers={this.handleViewPlayers}
      />
    );
  }
}

TeamsListContainer.defaultProps = {
  teams: []
};

TeamsListContainer.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      info: PropTypes.string,
      tournamentId: PropTypes.number
    })
  ),
  tournamentId: PropTypes.string.isRequired
};

export default TeamsListContainer;
