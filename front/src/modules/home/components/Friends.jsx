import React, { Component } from "react";

class Friends extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(
      "http://comunicateapi-env.eba-nzgfexux.us-east-1.elasticbeanstalk.com/getFriends/1"
    )
      .then((res) => res.json())
      .then((json) => this.setState({ data: json }));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.data.map((el) => (
            <li>
              {el.nombre}: {el.apellido}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Friends;
