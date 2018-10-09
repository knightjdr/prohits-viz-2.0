import React from 'react';

import Navbar from '../navbar/navbar-container';
import Newsfeed from './newsfeed/newsfeed';
import Title from './title/title';

import './home.css';

const Home = () => (
  <div className="Home-container">
    <Navbar background={false} />
    <div className="Home-text">
      <Title />
      <Newsfeed />
    </div>
  </div>
);

export default Home;
