import React from "react";
import fetch from "isomorphic-unfetch";

class Breed extends React.Component {
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
      }));

    return res;
  }

  render() {
    return <pre>{JSON.stringify(this.props.tournaments, null, 2)}</pre>;
  }
}

export default Breed;
