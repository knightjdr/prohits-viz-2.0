import React from 'react';

import Navbar from '../navbar/navbar-container';

import './visualization.css';

const links = [
  {
    route: '/analysis',
    text: 'ANALYSIS',
  },
  {
    route: '/help',
    text: 'HELP',
  },
];

const Visualization = () => (
  <div className="Visualization-container">
    <Navbar
      links={links}
    />
  </div>
);

export default Visualization;
