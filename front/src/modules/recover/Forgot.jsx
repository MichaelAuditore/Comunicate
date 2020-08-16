import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
//Return implicito
export default () => {
  return (
    <article>
      <div class="login">
        <h2 class="logo"></h2>
        <form action="#" class="sm-gap">
          <div class="field">
            <label class="control-label" for="email">
              Email
            </label>
            <br />
            <input
              type="email"
              class="form-control"
              autofocus="autofocus"
              name="email"
              id="email"
            />
          </div>
          <div class="field">
            <label class="control-label" for="pwd">
              Password
            </label>
            <br />
            <input
              type="password"
              class="form-control"
              autocomplete="off"
              name="pwd"
              id="pwd"
            />
          </div>
          <div class="actions">
            <input
              class="btn-primary"
              type="button"
              name="submit"
              value="Log in"
              onclick="validate()"
            />
          </div>
          <div>
            <p>
              <Link to="/forgot-pwd">Olvidó su contraseña?</Link>
            </p>
          </div>
        </form>
      </div>
    </article>
  );
};
