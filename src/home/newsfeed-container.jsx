import React, { Component } from 'react';

import Newsfeed from './newsfeed';

const testNews = [
  {
    date: 'Jan 20, 2018',
    news: 'Some more news',
  },
  {
    date: 'Jan 5, 2018',
    news: 'Some news',
  }
];

class NewsfeedContainer extends Component {
  render() {
    return (
      <Newsfeed
        news={testNews}
      />
    );
  }
}

export default NewsfeedContainer;
