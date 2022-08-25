import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import "./index.css";

import Footer from '../footer';

const Login = ({ firebase }) => {
  const history = useHistory();

  return (
    <div className="section-login">
      <div className="welcome-title">Welcome to <span className="bold">🐝 Bee Womp</span></div>
      <div className="welcome-message">To use a soundboard, please sign in with one of the following options:</div>
      <div
        className="log-in-btn"
        onClick={() => {
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
          history.push("/")
        }}
      >
        Sign In with Google
      </div>
      <div
        className="log-in-btn"
        onClick={() => {
          firebase.auth().signInAnonymously();
          history.push("/")
        }}
      >
        Sign In As Guest
      </div>
      <Footer />
    </div>
  )
}

export default Login;
