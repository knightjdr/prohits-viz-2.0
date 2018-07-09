import React, { Component } from 'react';

import Save from './panel__save';

class SaveContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageType: 'svg',
      sessionName: '',
    };
  }
  render() {
    return (
      <Save
        imageType={this.state.imageType}
        sessionName={this.state.sessionName}
      />
    );
  }
}

export default SaveContainer;
