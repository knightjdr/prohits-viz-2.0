import React, { Component } from 'react';

import Newsfeed from './newsfeed';

const testNews = [
  {
    date: 'Apr 25, 2018',
    news: 'ProHits-viz 2.0 released',
  },
  {
    date: 'Jan 5, 2018',
    news: 'Some older news',
  },
];

class NewsfeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testNews,
    };
  }
  render() {
    return (
      <Newsfeed
        news={this.state.testNews}
      />
    );
  }
}

export default NewsfeedContainer;
