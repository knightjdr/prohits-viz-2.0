import React from 'react';

import HelpBar from './help-bar/help-bar-container';
import HelpDetails from './help-details/help-details';
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
  {
    route: '/news',
    text: 'NEWS',
  },
];

const Help = () => (
  <div className="Help-container">
    <Navbar
      links={links}
    />
    <div className="Help-content">
      <HelpBar />
      <HelpDetails />
    </div>
  </div>
);

export default Help;
