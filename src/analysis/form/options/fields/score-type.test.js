import React from 'react';
import { shallow } from 'enzyme';

import ScoreType from './score-type';

describe('ScoreType', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <ScoreType
        analysisType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
