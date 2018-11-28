import React from 'react';
import ReactDOM from 'react-dom';

import Store from './state/store';
import { unregister } from './registerServiceWorker';

import './index.css';

ReactDOM.render(<Store />, document.getElementById('root'));
unregister();
