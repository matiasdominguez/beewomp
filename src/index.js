import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { FirebaseAuthProvider, FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user }) => {
          const parsedUser = user ? JSON.parse(JSON.stringify(user)) : null;

          return (
            <App
              firebase={firebase}
              isSignedIn={isSignedIn}
              user={parsedUser}
            />
          );
        }}
      </FirebaseAuthConsumer>
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
