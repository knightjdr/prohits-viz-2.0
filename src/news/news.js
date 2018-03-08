import React from 'react';

import Navbar from '../navbar/navbar-container';

import './news.css';

const links = [];

const News = () => (
  <div className="News-container">
    <Navbar
      links={links}
    />
  </div>
);

export default News;
