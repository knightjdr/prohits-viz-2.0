import React from 'react';

import About from './about/about';
import Home from './home/home-container';
import Spotlight from './spotlight/spotlight';
import Tools from './tools/tools';

import './App.css';

const App = () => (
  <main className="app">
    <Home />
    <Tools />
    <Spotlight />
    <About />
  </main>
);

export default App;
