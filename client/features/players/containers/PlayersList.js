import React from "react";
import PropTypes from "prop-types";
import PlayersList from "../components/PlayersList";
import Router from "next/router";
import { deletePlayer } from "../../../services/players";

class PlayersListContainer extends React.Component {
  handleCreatePlayer = () => {
    const { teamId } = this.props;
    Router.push(`/playerForm?teamId=${teamId}`);
  };

  handleEditPlayer = id => {
    const { teamId } = this.props;
    Router.push(`/playerForm?id=${id}&teamId=${teamId}`);
  };

  handleDeletePlayer = id => {
    const { teamId } = this.props;
    deletePlayer(id)
      .then(() => Router.push(`/players?teamId=${teamId}`))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <PlayersList
        players={this.props.players}
        onCreate={this.handleCreatePlayer}
        onEdit={this.handleEditPlayer}
        onDelete={this.handleDeletePlayer}
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
  teamId: PropTypes.string.isRequired
};

export default PlayersListContainer;
