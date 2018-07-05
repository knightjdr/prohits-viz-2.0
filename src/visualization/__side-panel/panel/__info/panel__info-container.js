import React, { Component } from 'react';

import ColorGradient from '../../../color/color-gradient';
import Info from './panel__info';

import TestParams from '../../../test/params';

class InfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legend: {
        abundanceName: 'AvgSpec',
        gradient: ColorGradient('blueBlack', 101, false),
        max: 50,
        min: 0,
        primaryScore: 0.01,
        scoreName: 'BFDR',
        scoreType: 'lte',
        secondaryScore: 0.05,
        type: 'dotplot',
      },
      params: TestParams,
    };
  }
  render() {
    return (
      <Info
        legend={this.state.legend}
        params={this.state.params}
      />
    );
  }
}

export default InfoContainer;
