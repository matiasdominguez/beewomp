import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "firebase/auth";
import { FirestoreProvider } from "@react-firebase/firestore";
import { ScaleLoader } from "react-spinners"

import "./app.css";
import Navigation from "./components/navigation";
import Login from './components/login';
import Home from './components/pages/home';

const ONE_SECOND = 1000;

function App({ isSignedIn, user, config, firebase }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let loadingTimeout = setTimeout(() => setIsLoading(false), ONE_SECOND);
    return () => {
      clearTimeout(loadingTimeout);
    }
  }, [])

  if (isLoading) {
    return (
      <div className="app-loading">
        <ScaleLoader size={20} margin={5} color="white" />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-container">
        <FirestoreProvider firebase={firebase} {...config}>
          <Router>
            <div>
              {isSignedIn && (
                <Navigation />
              )}
              <Switch>
                <Route path="/">
                  {isSignedIn ? (
                    <Home
                      firebase={firebase}
                      user={user}
                      setIsLoading={setIsLoading}
                    />
                  ) : (
                    <Login firebase={firebase} />
                  )}
                </Route>
              </Switch>
            </div>
          </Router>
        </FirestoreProvider>
      </div>
    </div>
  );
}

export default App;
