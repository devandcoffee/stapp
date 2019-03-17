import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import PlayerForm from "../components/PlayerForm";
import { getISOString } from "../../../utils/dates";

import { createPlayer, updatePlayer } from "../../../services/players";

class PlayerFormContainer extends React.Component {
  handleSubmit = formValues => {
    const { player, teamId } = this.props;

    const body = {
      ...formValues,
      teamId: parseInt(teamId, 10),
      birthday: getISOString(formValues.birthday)
    };

    if (!player) {
      createPlayer(body)
        .then(() => {
          Router.push(`/players?teamId=${teamId}`);
        })
        .catch(err => {
          console.error("there was an error creating the player", err);
        });
    } else {
      const id = body.ID;

      updatePlayer(id, { ...body, ID: undefined })
        .then(() => {
          Router.push(`/players?teamId=${teamId}`);
        })
        .catch(err => {
          console.error("there was an error creating the player", err);
        });
    }
  };

  handleCancel = () => {
    const { teamId } = this.props;
    Router.push(`/players?teamId=${teamId}`);
  };

  render() {
    const { player } = this.props;

    return (
      <PlayerForm
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        player={player}
      />
    );
  }
}

PlayerFormContainer.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    birthday: PropTypes.string,
    teamId: PropTypes.number
  }),
  teamId: PropTypes.string
};

export default PlayerFormContainer;
