import React from 'react';
import { shallow } from 'enzyme';

import HelpNavButtons from './help-nav-buttons';

describe('HelpNavButtons', () => {
  test('Renders with both forward and back route', () => {
    const wrapper = shallow(
      <HelpNavButtons
        navBackward="/testback"
        navForward="/testforward"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Renders with forward route only', () => {
    const wrapper = shallow(
      <HelpNavButtons
        navForward="/testforward"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Renders with back route only', () => {
    const wrapper = shallow(
      <HelpNavButtons
        navBackward="/testback"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
