import React from "react";
import "./index.css";

import Footer from '../footer';

const Login = ({ firebase }) => {
  return (
    <div className="section-login">
      <div className="welcome-title">🐝 Welcome to <span className="bold"><u>Bee Womp</u></span></div>
      <div className="welcome-message">To use a soundboard, please sign in with one of the following options:</div>
      <div
        className="log-in-btn"
        onClick={() => {
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
        }}
      >
        Sign In with Google
      </div>
      <div
        className="log-in-btn"
        onClick={() => {
          firebase.auth().signInAnonymously();
        }}
      >
        Sign In As Guest
      </div>
      <Footer />
    </div>
  )
}

export default Login;
