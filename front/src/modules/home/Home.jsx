import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import requests from "../../actions/apiRequests";
import Friends from "./components/Friends";

//Return implicito
export default () => {
  const [personName, setName] = useState("");
  const [status, setStatus] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    setStatus(true);
    setId(1);
  }, []);

  const onSubmit = function (event) {
    event.preventDefault();
    if (personName !== "") {
      requests.searchPeopleByName(personName);
    } else {
      requests.searchPeople();
    }
  };

  const onReload = function (event) {
    event.preventDefault();
    if (!status) {
      setStatus(true);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col div-nav">
          <nav className="navbar navbar-dark bg-primary">
            <h2 className="navbar-brand">Comunicate</h2>
            <Link className="home-icon" to="#"></Link>
            <Link className="messages-icon" to="#"></Link>
            <Link className="requests-icon" to="#"></Link>
            <form className="form-inline" onSubmit={onSubmit}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search People"
                aria-label="Search"
                onChange={(event) => setName(event.target.value)}
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
            <form onSubmit={onReload}>
              <input type="submit" value="" className="refresh-icon" />
            </form>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col div-nav"></div>
        <div className="col col-lg-2 div-nav friends">
          <Friends render={status} id={id} />
        </div>
      </div>
    </div>
  );
};
