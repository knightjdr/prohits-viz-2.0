import React from 'react';

import Navbar from '../navbar/navbar-container';

import './help.css';

const links = [
  {
    route: '/analysis',
    text: 'ANALYSIS',
  },
  {
    route: '/visualization',
    text: 'VISUALIZATION',
  },
];

const Help = () => (
  <div className="Help-container">
    <Navbar
      links={links}
    />
  </div>
);

export default Help;
