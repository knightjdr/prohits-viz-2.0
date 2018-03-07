import React from 'react';

import Navbar from '../navbar/navbar-container';

import './analysis.css';

const links = [
  {
    route: '/visualization',
    text: 'VISUALIZATION',
  },
  {
    route: '/help',
    text: 'HELP',
  },
];

const Analysis = () => (
  <div className="Analysis-container">
    <Navbar
      links={links}
    />
  </div>
);

export default Analysis;
