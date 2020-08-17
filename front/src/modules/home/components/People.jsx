import React, { Component } from "react";
import requests from "../../../actions/apiRequests";

class People extends Component {
  constructor(searchName) {
    super(searchName);
    this.state = { people: [], name: searchName };
  }

  componentDidMount() {
    //Get added Friends
    console.log(this.state.name);
    fetch(requests.URL + "searhPeople/", requests.miInit)
      .then((res) => res.json())
      .then((myJson) => this.setState({ friends: myJson }));
  }

  render() {
    return this.state.friends.map((l, idx) => {
      return (
        <div className="friend" key={idx}>
          <p>
            {l.nombre} {l.apellido}
          </p>
          <span id={l.id}>&times;</span>
        </div>
      );
    });
  }
}

export default People;
