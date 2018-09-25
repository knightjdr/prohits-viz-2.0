import React from 'react';

import renderTable from './browser-session__table';
import IndexDB from '../browser-storage/indexeddb-container';

import './browser-session.css';

const BrowserSession = () => (
  <IndexDB render={renderTable} />
);

export default BrowserSession;
