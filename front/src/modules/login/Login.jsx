import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from "../../utils/userPool";
import "../../styles/login.css";
import { showModal } from "../../actions/general";
import requests from "../../actions/apiRequests";

//Return implicito
export default () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    //User to check it into Cognito
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    //Details to check inside Cognito about account to Login
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: pwd,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        localStorage.setItem(
          "accessToken",
          data.getAccessToken().getJwtToken()
        );
        localStorage.setItem("sub", data.getAccessToken().payload.sub);
        requests.getID();
        window.location.href = "#/home";
      },

      onFailure: (err) => {
        if (err.code === "UserNotConfirmedException") {
          window.location.href = "/#/verify";
        } else {
          showModal(err.message);
        }
      },

      newPasswordRequired: (data) => {
        console.log("newPasswordRequired:", data);
      },
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
