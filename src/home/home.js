import React, { Component } from 'react';

import Newsfeed from './newsfeed-container';
import Pipeline from './pipeline-container';
import Title from './title';

import './home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: null,
      rows: null,
      start: true,
    };
  }
  componentDidMount = () => {
    this.onMount();
  }
  onMount = () => {
    const height = this.homeElement.clientHeight;
    const width = this.homeElement.clientWidth;
    this.setState({
      columns: 2,
      height,
      rows: Math.round(height / 20) / 2,
      width,
    });
  }
  render() {
    return (
      <div
        className="Home-container"
        ref={(homeElement) => { this.homeElement = homeElement; }}
      >
        <Title />
        <Newsfeed />
        <Pipeline
          columns={this.state.columns}
          height={this.state.height}
          rows={this.state.rows}
          start={this.state.start}
          width={this.state.width}
        />
      </div>
    );
  }
}
