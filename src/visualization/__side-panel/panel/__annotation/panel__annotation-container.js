import React, { Component } from 'react';

import Annotation from './panel__annotation';

class AnnotationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annotations: [],
      markers: [],
      move: false,
      record: false,
    };
  }
  render() {
    return (
      <Annotation
        move={this.state.move}
        record={this.state.record}
      />
    );
  }
}

export default AnnotationContainer;
