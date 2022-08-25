import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { GridLoader } from "react-spinners";
import momentJs from 'moment';
import './index.css';

import Footer from '../../footer';

const Home = ({ user, firebase }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="app-loading">
        <GridLoader size={20} margin={5} color="white" />
      </div>
    );
  }

  return (
    <div className="page-home">
      <div className="page-home-container">
        Home Page
      </div>
      <Footer firebase={firebase} user={user} />
    </div>
  );
};

export default Home;
