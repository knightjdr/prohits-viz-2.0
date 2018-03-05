import React, { Component } from 'react';

import Newsfeed from './newsfeed-container';
import Pipeline from './pipeline-container';
import Title from './title';

import './home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePipeline: false,
    };
  }
  componentDidMount = () => {
    this.onMount();
  }
  onMount = () => {
    const height = this.homeElement.clientHeight;
    const width = this.homeElement.clientWidth;
    this.setState({
      height,
      width,
    });
  }
  resize = () => {}
  render() {
    return (
      <div
        className="Home-container"
        ref={(homeElement) => { this.homeElement = homeElement; }}
      >
        <Title />
        <Newsfeed />
        <Pipeline
          height={this.state.height}
          hide={this.state.hidePipeline}
          width={this.state.width}
        />
      </div>
    );
  }
}
