import React from 'react';

import About from './about/about';
import Home from './home/home-container';
import Spotlight from './spotlight/spotlight';
import Tools from './tools/tools';

import './App.css';

const App = () => (
  <div className="App">
    <Home />
    <Tools />
    <Spotlight />
    <About />
  </div>
);

export default App;
