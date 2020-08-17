import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import Friends from "./components/Friends";
import Reqs from "./components/Requests";
import Welcome from "./components/Welcome";
import People from "./components/People";
import Messages from "./components/Messages";
import requests from "../../actions/apiRequests";

export default () => {
  const [id, setId] = useState(0);
  useEffect(() => {
    const sub = localStorage.getItem("sub");
    const URL = `${requests.URL}login/${sub}`;
    requests.getID(URL);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col div-nav">
          <nav className="navbar navbar-dark bg-primary">
            <h2 className="navbar-brand">Comunicate</h2>
            <form onSubmit={""}>
              <button className="home-icon" type="submit"></button>
            </form>
            <form onSubmit={""}>
              <button className="messages-icon" type="submit"></button>
            </form>

            <form onSubmit={""}>
              <button className="requests-icon" type="submit"></button>
            </form>

            <form className="form-inline" onSubmit={""}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search People"
                aria-label="Search"
                onChange={(event) => console.log(event.target.value)}
              />
              <button
                className="btn btn-outline-dark my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </nav>
        </div>
        <div className="col col-lg-2 col div-nav">
          <ul className="navbar navbar-light bg-dark">
            <h2 className="navbar-brand light">Friends</h2>
            <form onSubmit={""}>
              <input type="submit" value="" className="refresh-icon" />
            </form>
          </ul>
        </div>
      </div>
      <div className="row content">
        <div className="col div-nav"></div>
        <div className="col col-lg-2 div-nav friends"></div>
      </div>
    </div>
  );
};
