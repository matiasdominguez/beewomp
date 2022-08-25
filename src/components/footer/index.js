import React, { Fragment } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Footer = ({ user, firebase }) => {
  const handleClickLogout = () => {
    firebase.auth().signOut();
  }

  if (user && firebase) {
    return (
      <div className="page-footer">
        Logged In As {user.displayName ? user.displayName : 'Guest'} <span className="page-footer-logout-btn" onClick={handleClickLogout}>[Logout]</span><br/>
        <FontAwesomeIcon icon={faEllipsisH} /><br/>
        <Credits />
      </div>
    );
  }

  return (
    <div className="page-footer">
      <Credits />
    </div>
  );
};

const Credits = () => (
  <Fragment>
    <Link to="/">🐝 Bee Womp</Link> was made with <FontAwesomeIcon icon={faHeart} /> by <a href="https://nafeu.com/about">Nafeu.</a>
  </Fragment>
)

export default Footer;
