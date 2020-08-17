import React, { Component } from "react";
import requests from "../../../actions/apiRequests";

class Friends extends Component {
  constructor() {
    super();
    this.state = { friends: [] };
  }

  componentDidMount() {
    //Get added Friends
    fetch(requests.URL + "getFriends/" + localStorage.getItem("id"))
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

export default Friends;
