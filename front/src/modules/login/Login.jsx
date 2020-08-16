import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

//Return implicito
export default () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(email, pwd);
  };

  return (
    <article>
      <div className="login">
        <h2 className="logo"></h2>
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
            <label className="control-label" htmlFor="pwd">
              Contraseña
            </label>
            <br />
            <input
              type="password"
              className="form-control"
              autoComplete="off"
              onChange={(event) => setPwd(event.target.value)}
              name="pwd"
              id="pwd"
            />
          </div>
          <div className="actions">
            <button className="btn-primary" type="submit">
              Ingresar
            </button>
          </div>
          <hr />
          <div>
            <p>
              {" "}
              <Link to="/sign-up">Registrate</Link>
            </p>
            <p>
              {" "}
              <Link to="/forgot-pwd">Olvidó su contraseña?</Link>
            </p>
          </div>
        </form>
      </div>
    </article>
  );
};
