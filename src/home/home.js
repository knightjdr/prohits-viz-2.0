import React from 'react';

import Navbar from '../navbar/navbar-container';
import Newsfeed from './newsfeed/newsfeed';
import Title from './title/title';

import './home.css';

const links = [
  {
    route: '/analysis',
    text: 'analysis',
  },
  {
    route: '/visualization',
    text: 'visualization',
  },
  {
    route: '/news',
    text: 'news',
  },
  {
    route: '/help',
    text: 'help',
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
