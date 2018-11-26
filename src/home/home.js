import React from 'react';

import Description from './description/description';
import Newsfeed from './newsfeed/newsfeed';
import Title from './title/title';

import './home.css';

const Home = () => (
  <section className="home">
    <div className="home__inner">
      <div className="home__about">
        <Title />
        <Description />
        <Newsfeed />
      </div>
    </div>
  </section>
);

export default Home;
