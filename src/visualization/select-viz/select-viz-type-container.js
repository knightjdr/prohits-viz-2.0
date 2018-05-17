import React, { Component } from 'react';

import SelectVizType from './select-viz-type';
import ValidateJson from './validate-json';

export class SelectVizTypeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vizType: null,
    };
  }
  handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const json = ValidateJson(reader.result);
      if (json.err) {
        console.log(json.message);
      } else {
        console.log('validated');
      }
    };
    reader.readAsText(file.fileList[0]);
  }
  render() {
    return (
      <SelectVizType
        handleFile={this.handleFile}
        vizType={this.state.vizType}
      />
    );
  }
}

export default SelectVizTypeContainer;
