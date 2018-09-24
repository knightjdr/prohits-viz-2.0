import React from 'react';

import BrowserSessionTable from './browser-session__table';
import IndexDB from '../browser-storage/indexeddb-container';

import './browser-session.css';

const BrowserSession = () => (
  <IndexDB
    render={props => <BrowserSessionTable {...props} />}
  />
);

export default BrowserSession;
