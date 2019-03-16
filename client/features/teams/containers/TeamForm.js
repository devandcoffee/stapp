import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import TeamForm from "../components/TeamForm";
import { createTeam, updateTeam } from "../../../services/teams";

class TeamFormContainer extends React.Component {
  handleSubmit = formValues => {
    const { team, tournamentId } = this.props;

    const body = {
      ...formValues,
      tournamentId: parseInt(tournamentId, 10)
    };

    if (!team) {
      createTeam(body)
        .then(() => {
          Router.push(`/teams?tournamentId=${tournamentId}`);
        })
        .catch(err => {
          console.error("there was an error creating the team", err);
        });
    } else {
      const id = body.ID;

      updateTeam(id, { ...body, ID: undefined })
        .then(() => {
          Router.push(`/teams?tournamentId=${tournamentId}`);
        })
        .catch(err => {
          console.error("there was an error creating the team", err);
        });
    }
  };

  handleCancel = () => {
    const { tournamentId } = this.props;
    Router.push(`/teams?tournamentId=${tournamentId}`);
  };

  render() {
    const { team } = this.props;

    return (
      <TeamForm
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        team={team}
      />
    );
  }
}

TeamFormContainer.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    info: PropTypes.string,
    tournamentId: PropTypes.number
  }),
  tournamentId: PropTypes.string
};

export default TeamFormContainer;
