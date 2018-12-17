import React from 'react';

import Description from './description/description';
import Newsfeed from './newsfeed/newsfeed';
import Title from './title/title';

import './landing.css';

const Landing = () => (
  <section className="landing">
    <div className="landing__inner">
      <div className="landing__about">
        <Title />
        <Description />
        <Newsfeed />
      </div>
    </div>
  </section>
);

export default Landing;
