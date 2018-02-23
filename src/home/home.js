import React, { Component } from 'react';

import Newsfeed from './newsfeed-container';
import Title from './title';

import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home-container">
        <Title />
        <Newsfeed />
      </div>
    );
  }
}

export default Home;
