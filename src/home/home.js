import React from 'react';

import Description from './description/description';
import Navbar from '../navbar/navbar-container';
import Newsfeed from './newsfeed/newsfeed';
import Title from './title/title';
import Video from './video/video';

import './home.css';

const Home = () => (
  <div className="home">
    <Navbar background={false} />
    <div className="home__inner">
      <div className="home__grid">
        <Title />
        <Description />
        <Newsfeed />
        <Video />
      </div>
    </div>
  </div>
);

export default Home;
