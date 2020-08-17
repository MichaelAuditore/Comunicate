import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import "../../styles/register.css";
import userPool from "../../utils/userPool";
import { showModal } from "../../actions/general";
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const requests = require("../../actions/apiRequests");

//Return implicito
export default () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (pwd === cpwd) {
      const nameData = {
        Name: "name",
        Value: name,
      };

      const lastNameData = {
        Name: "middle_name",
        Value: lastName,
      };

      const emailData = {
        Name: "email",
        Value: email,
      };

      const nameAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(
        nameData
      );
      const lastNameAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(
        lastNameData
      );
      const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(
        emailData
      );

      userPool.signUp(
        email,
        pwd,
        [nameAttribute, lastNameAttribute, emailAttribute],
        null,
        (err, data) => {
          if (err) {
            return showModal(err.message);
          }

          const success = requests.createUser(
            name,
            lastName,
            email,
            data.userSub
          );

          if (success) {
            window.location.href = "#/verify";
          }
        }
      );
    }
  };

  return (
    <article>
      <div className="login register">
        <div className="logo" title="logo" aria-labelledby="logo"></div>
        <form onSubmit={onSubmit} className="sm-gap">
          <div className="row">
            <div className="field col-md-6">
              <label className="control-label" htmlFor="nombre">
                Nombre
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                autoFocus="autofocus"
                name="nombre"
                id="nombre"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="field col-md-6">
              <label className="control-label" htmlFor="apellido">
                Apellido
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                autoFocus="autofocus"
                name="apellido"
                id="apellido"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="field col-md-6">
              <label className="control-label" htmlFor="pwd">
                Contraseña
              </label>
              <br />
              <input
                type="password"
                className="form-control"
                autoFocus="autofocus"
                name="pwd"
                id="pwd"
                onChange={(event) => setPwd(event.target.value)}
              />
            </div>
            <div className="field col-md-6">
              <label className="control-label" htmlFor="cpwd">
                Confirmar contraseña
              </label>
              <br />
              <input
                type="password"
                className="form-control"
                autoFocus="autofocus"
                name="cpwd"
                id="cpwd"
                onChange={(event) => setCpwd(event.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="control-label" htmlFor="email">
              Email
            </label>
            <br />
            <input
              type="email"
              className="form-control"
              autoComplete="off"
              name="email"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="actions">
            <button className="btn-primary" type="submit">
              Registrar
            </button>
          </div>
          <hr />
          <div>
            <p>
              {" "}
              <Link to="/">Conectate</Link>
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
