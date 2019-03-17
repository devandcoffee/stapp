import React from "react";
import PropTypes from "prop-types";
import PlayersList from "../components/PlayersList";
import Router from "next/router";
import { deletePlayer } from "../../../services/players";

class PlayersListContainer extends React.Component {
  handleCreatePlayer = () => {
    const { teamId, tournamentId } = this.props;
    Router.push(`/playerForm?teamId=${teamId}&tournamentId=${tournamentId}`);
  };

  handleEditPlayer = id => {
    const { teamId, tournamentId } = this.props;
    Router.push(
      `/playerForm?id=${id}&teamId=${teamId}&tournamentId=${tournamentId}`
    );
  };

  handleDeletePlayer = id => {
    const { teamId, tournamentId } = this.props;
    deletePlayer(id)
      .then(() =>
        Router.push(`/players?teamId=${teamId}&tournamentId=${tournamentId}`)
      )
      .catch(err => console.error(err));
  };

  handleGoBack = () => {
    const { tournamentId } = this.props;
    Router.push(`/teams?tournamentId=${tournamentId}`);
  };

  render() {
    return (
      <PlayersList
        players={this.props.players}
        onCreate={this.handleCreatePlayer}
        onEdit={this.handleEditPlayer}
        onDelete={this.handleDeletePlayer}
        onGoBack={this.handleGoBack}
      />
    );
  }
}

PlayersListContainer.defaultProps = {
  players: []
};

PlayersListContainer.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      address: PropTypes.string,
      birthday: PropTypes.string,
      teamId: PropTypes.number
    })
  ),
  teamId: PropTypes.string.isRequired,
  tournamentId: PropTypes.string.isRequired
};

export default PlayersListContainer;
