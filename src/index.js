import React from 'react';
import ReactDOM from 'react-dom';

import Store from './state/store';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<Store />, document.getElementById('root'));
registerServiceWorker();
