import React from 'react';
import { shallow } from 'enzyme';

import HelpBar from './help-bar';

const showPanel = jest.fn();

describe('HelpBar', () => {
  test('It renders', () => {
    const wrapper = shallow(
      <HelpBar
        isPanelVisible={false}
        isSmallScreen={false}
        showPanel={showPanel}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('It renders with panel', () => {
    const wrapper = shallow(
      <HelpBar
        isPanelVisible
        isSmallScreen={false}
        showPanel={showPanel}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('It renders on small screen', () => {
    const wrapper = shallow(
      <HelpBar
        isPanelVisible={false}
        isSmallScreen
        showPanel={showPanel}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('It renders on small screen with panel', () => {
    const wrapper = shallow(
      <HelpBar
        isPanelVisible
        isSmallScreen
        showPanel={showPanel}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
