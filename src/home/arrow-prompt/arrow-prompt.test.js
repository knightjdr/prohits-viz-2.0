import React from 'react';
import { shallow } from 'enzyme';

import ArrowPrompt from './arrow-prompt';

describe('ArrowPrompt', () => {
  test('Renders when visible with opacity of 1', () => {
    const wrapper = shallow(
      <ArrowPrompt
        hide={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    const container = wrapper.find('.ArrowPrompt-down-prompt-container');
    expect(container.props().style).toHaveProperty('opacity', 1);
  });

  test('Hidden by setting opacity to 0', () => {
    const wrapper = shallow(
      <ArrowPrompt
        hide
      />,
    );
    const container = wrapper.find('.ArrowPrompt-down-prompt-container');
    expect(container.props().style).toHaveProperty('opacity', 0);
  });
});
