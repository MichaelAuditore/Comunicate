import React from "react";
import "../../../styles/info.css";
import requests from "../../../actions/apiRequests";

class Reqs extends React.Component {
  constructor() {
    super();
    this.state = { reqs: [] };
  }

  componentDidMount() {
    fetch(requests.URL + "getRequests/" + localStorage.getItem("id"))
      .then((res) => res.json())
      .then((myJson) => this.setState({ reqs: myJson }));
  }

  render() {
    return this.state.reqs > 0 ? (
      this.state.reqs.map((r, idx) => {
        return (
          <div className="friend" key={idx}>
            <p>
              {r.nombre} {r.apellido}
            </p>
            <button onClick={""} id={r.id}>
              Aceptar Solicitud
            </button>
            <button onClick={""} id={r.id}>
              Eliminar Solicitud
            </button>
          </div>
        );
      })
    ) : (
      <div className="friend">
        <p>No tienes solicitudes de amistad</p>
      </div>
    );
  }
}

export default Reqs;
