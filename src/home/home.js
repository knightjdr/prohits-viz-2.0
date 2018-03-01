import React from 'react';

import Newsfeed from './newsfeed-container';
import Title from './title';

import './home.css';

const Home = () => (
  <div className="Home-container">
    <Title />
    <Newsfeed />
  </div>
);

export default Home;
