import React from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";

import TournamentForm from "../components/TournamentForm";

class TournamentFormContainer extends React.Component {
  handleSubmit = formValues => {
    const body = {
      ...formValues,
      userId: this.props.userId
    };
    // fetch(`http://localhost:8080/api/tournaments`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then((response) => response.json())
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(err => {
    //   console.log("there was an error creating the tournament")
    // })
  };

  handleCancel = () => {
    console.log("canceling");
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
  }),
  userId: PropTypes.number
};

export default TournamentFormContainer;
