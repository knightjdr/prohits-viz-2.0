import React from 'react';

import Description from './description/description';
import Navbar from '../navbar/navbar-container';
import Newsfeed from './newsfeed/newsfeed';
import Title from './title/title';

import './home.css';

const Home = () => (
  <div className="home">
    <Navbar background="semi" />
    <div className="home__inner">
      <div className="home__about">
        <Title />
        <Description />
        <Newsfeed />
      </div>
    </div>
  </div>
);

export default Home;
