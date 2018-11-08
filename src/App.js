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
    };
  }
  componentDidMount = () => {
    if (window.scrollY > 0) {
      this.setState({
        hidePrompt: true,
      });
    } else {
      window.addEventListener('scroll', this.handleScroll);
      this.setState({
        hidePrompt: false,
      });
    }
  }
  componentWillUnmount = () => {
    if (!this.state.hidePrompt) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
  checkTop = (scrollTop) => {
    if (
      !this.state.hidePrompt &&
      scrollTop > 0
    ) {
      window.removeEventListener('scroll', this.handleScroll);
      this.setState({
        hidePrompt: true,
      });
    }
  }
  handleScroll = () => {
    this.checkTop(window.scrollY);
  }
  render() {
    return (
      <div className="app">
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
