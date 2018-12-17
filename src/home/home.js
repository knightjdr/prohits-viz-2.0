import React from 'react';

import About from './about/about';
import Landing from './landing/landing-container';
import Spotlight from './spotlight/spotlight';
import Tools from './tools/tools';

import './home.css';

const Home = () => (
  <main className="home">
    <Landing />
    <Tools />
    <Spotlight />
    <About />
  </main>
);

export default Home;
