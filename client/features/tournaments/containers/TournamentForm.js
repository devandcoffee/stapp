import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import TournamentForm from "../components/TournamentForm";
import {
  createTournament,
  updateTournament
} from "../../../services/tournaments";
import { getISOString } from "../../../utils/dates";
import { getUserId } from "../../../utils/auth";

class TournamentFormContainer extends React.Component {
  handleSubmit = formValues => {
    const body = {
      ...formValues,
      startDate: getISOString(formValues.startDate),
      endDate: getISOString(formValues.endDate),
      userId: getUserId()
    };

    const { tournament } = this.props;

    if (!tournament) {
      createTournament(body)
        .then(() => {
          Router.push("/tournaments");
        })
        .catch(err => {
          console.error("there was an error creating the tournament", err);
        });
    } else {
      const id = body.ID;

      updateTournament(id, { ...body, ID: undefined })
        .then(() => {
          Router.push(`/tournaments`);
        })
        .catch(err => {
          console.error("there was an error creating the tournament", err);
        });
    }
  };

  handleCancel = () => {
    Router.push("/tournaments");
  };

  render() {
    const { tournament } = this.props;

    return (
      <TournamentForm
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        tournament={tournament}
      />
    );
  }
}

TournamentFormContainer.propTypes = {
  tournament: PropTypes.shape({
    id: PropTypes.id,
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  })
};

export default TournamentFormContainer;
