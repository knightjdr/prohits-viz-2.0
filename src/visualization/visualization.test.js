import React from 'react';
import { shallow } from 'enzyme';

import { VisualizationComponent } from './visualization';

describe('Visualization', () => {
  test('Renders with base path', () => {
    const wrapper = shallow(
      <VisualizationComponent
        match={{ path: 'visualization' }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
