import React, { Component } from 'react';

import About from './about/about';
import ArrowPrompt from './home/arrow-prompt/arrow-prompt';
import Home from './home/home-container';
import Spotlight from './spotlight/spotlight';
import Tools from './tools/tools';

import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listenerAdded: false,
      hidePrompt: true,
    };
  }
  componentDidMount = () => {
    const { scrollTop } = this.elem;
    if (scrollTop === 0) {
      this.elem.addEventListener('scroll', this.handleScroll);
      this.setState({
        hidePrompt: false,
        listenerAdded: true,
      });
    }
  }
  componentWillUnmount = () => {
    if (this.state.listenerAdded) {
      this.elem.removeEventListener('scroll', this.handleScroll);
    }
  }
  checkTop = (scrollTop) => {
    if (
      !this.state.hidePrompt &&
      scrollTop > 0
    ) {
      this.elem.removeEventListener('scroll', this.handleScroll);
      this.setState({
        hidePrompt: true,
        listenerAdded: false,
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
