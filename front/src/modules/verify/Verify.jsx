import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CognitoUser } from "amazon-cognito-identity-js";
import userPool from "../../utils/userPool";
import "../../styles/login.css";
import { showModal } from "../../actions/general";

//Return implicito
export default () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    showModal("Se le ha enviado al correo un código para la verificación");
    setShow(true);
  }, [show]);

  const onSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) return showModal(err.message);
      window.location.href = "#/";
    });
  };

  return (
    <article>
      <div className="login">
        <div className="logo" title="logo" aria-labelledby="logo"></div>
        <form onSubmit={onSubmit} className="sm-gap">
          <div className="field">
            <label className="control-label" htmlFor="email">
              Email
            </label>
            <br />
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              autoFocus
              name="email"
              id="email"
            />
          </div>
          <div className="field">
            <label className="control-label" htmlFor="code">
              Código
            </label>
            <br />
            <input
              type="password"
              className="form-control"
              autoComplete="off"
              onChange={(event) => setCode(event.target.value)}
              name="code"
              id="code"
            />
          </div>
          <div className="actions">
            <button className="btn-primary" type="submit">
              Verificar
            </button>
          </div>
          <hr />
          <div>
            <p>
              <Link to="/sign-up">Registrate</Link>
            </p>
            <p>
              <Link to="/">Inicia sesión</Link>
            </p>
          </div>
        </form>
      </div>
    </article>
  );
};
