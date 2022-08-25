import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const location = useLocation();

  return (
    <Fragment>
      <div className="navigation">
        {location.pathname !== '/' && <Link to="/"><FontAwesomeIcon icon={faArrowLeft} /> Go Home</Link>}
      </div>
      <div className="app-logo">
        <Link to="/">🐝 Bee Womp</Link>
      </div>
    </Fragment>
  );
};

export default Navigation;
