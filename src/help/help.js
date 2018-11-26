import React from 'react';

import HelpBar from './help-bar/help-bar-container';
import HelpDetails from './help-details/help-details';

import './help.css';

const Help = () => (
  <div className="help">
    <div className="help__inner">
      <HelpBar />
      <HelpDetails />
    </div>
  </div>
);

export default Help;
