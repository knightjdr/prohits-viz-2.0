import React, { Component } from 'react';

import About from './about/about';
import ArrowPrompt from './home/arrow-prompt/arrow-prompt';
import Home from './home/home-container';
import Spotlight from './spotlight/spotlight';
import Tools from './tools/tools';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePrompt: true,
      onScroll: null,
    };
  }
  componentDidMount = () => {
    this.setState({
      hidePrompt: false,
      onScroll: this.handleScroll,
    });
  }
  checkTop = (scrollTop) => {
    if (
      !this.state.hidePrompt &&
      scrollTop > 0
    ) {
      this.setState({
        hidePrompt: true,
        onScroll: null,
      });
    }
  }
  handleScroll = () => {
    const { scrollTop } = this.elem;
    this.checkTop(scrollTop);
  }
  render() {
    return (
      <div
        className="App"
        ref={(elem) => { this.elem = elem; }}
        onScroll={this.state.onScroll}
      >
        <Home />
        <Tools />
        <Spotlight />
        <About />
        <ArrowPrompt hide={this.state.hidePrompt} />
      </div>
    );
  }
}

export default App;
