import React, { Component } from 'react';

import Newsfeed from './newsfeed/newsfeed-container';
import Pipeline from './pipeline/pipeline-container';
import Title from './title/title';

import './home.css';

const smallWindowSize = 750;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePipeline: this.isSmallWindow(),
      smallWindow: this.isSmallWindow(),
    };
  }
  componentDidMount = () => {
    this.onMount();
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize);
  }
  onMount = () => {
    const height = this.homeElement.clientHeight;
    const width = this.homeElement.clientWidth;
    this.setState({
      height,
      width,
    });
  }
  onResize = () => {
    this.setState({
      hidePipeline: true,
      smallWindow: this.isSmallWindow(),
    });
  }
  isSmallWindow = () => {
    const isSmall = window.innerWidth <= smallWindowSize;
    return isSmall;
  }
  togglePipeline = () => {
    this.setState(({ hidePipeline }) => {
      const height = hidePipeline ? this.homeElement.clientHeight : null;
      const width = hidePipeline ? this.homeElement.clientWidth : null;
      return {
        height,
        hidePipeline: !hidePipeline,
        width,
      };
    });
  }
  render() {
    return (
      <div
        className="Home-container"
        ref={(homeElement) => { this.homeElement = homeElement; }}
      >
        <Pipeline
          height={this.state.height}
          hide={this.state.hidePipeline}
          width={this.state.width}
        />
        <Title
          hidePipeline={this.state.hidePipeline}
          smallWindow={this.state.smallWindow}
          togglePipeline={this.togglePipeline}
        />
        <Newsfeed />
      </div>
    );
  }
}
