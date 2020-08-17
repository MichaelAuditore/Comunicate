import React from "react";
import "../../../styles/info.css";
import requests from "../../../actions/apiRequests";

class Messages extends React.Component {
  constructor() {
    super();
    this.state = { sms: [] };
  }

  componentDidMount() {
    fetch(
      requests.URL + "getAllMessages/" + localStorage.getItem("id")
    ).then((myJson) => this.setState({ sms: myJson }));
  }

  render() {
    return this.state.sms > 0 ? (
      this.state.sms.map((s, idx) => {
        return (
          <div className="friend" key={idx}>
            <p>
              {s.nombre} {s.apellido}
            </p>
            <button onClick={""} id={s.id}>
              Aceptar Solicitud
            </button>
            <button onClick={""} id={s.id}>
              Eliminar Solicitud
            </button>
          </div>
        );
      })
    ) : (
      <div className="friend">
        <p>No tienes mensajes</p>
      </div>
    );
  }
}

export default Messages;
