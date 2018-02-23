import React, { Component } from 'react';

import Home from './home/home';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <div className="App-second">
          something
        </div>
      </div>
    );
  }
}

export default App;
