import React from 'react';

import HelpBar from './help-bar/help-bar-container';
import HelpDetails from './help-details/help-details';
import Navbar from '../navbar/navbar-container';

import './help.css';

const Help = () => (
  <div className="help">
    <Navbar fixed />
    <div className="help__inner">
      <HelpBar />
      <HelpDetails />
    </div>
  </div>
);

export default Help;
