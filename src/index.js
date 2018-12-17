import React from 'react';
import ReactDOM from 'react-dom';

import { unregister } from './registerServiceWorker';

import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));

unregister();
