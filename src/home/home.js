import React from 'react';

import Navbar from '../navbar/navbar-container';
import Newsfeed from './newsfeed/newsfeed-container';
import Title from './title/title';

import './home.css';

const links = [
  {
    route: '/analysis',
    text: 'ANALYSIS',
  },
  {
    route: '/visualization',
    text: 'VISUALIZATION',
  },
  {
    route: '/help',
    text: 'HELP',
  },
];

const Home = () => (
  <div className="Home-container">
    <Navbar
      background={false}
      links={links}
    />
    <div className="Home-text">
      <Title />
      <Newsfeed />
    </div>
  </div>
);

export default Home;
