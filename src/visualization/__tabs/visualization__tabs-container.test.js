import React from 'react';
import { shallow } from 'enzyme';

import { TabsContainer } from './visualization__tabs-container';

describe('Tab container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <TabsContainer
        tabs={{
          selected: 'main',
          show: true,
        }}
      />,
    );
  });

  it('should have initial state with menu not shown', () => {
    expect(wrapper.state('showMenu')).toBeFalsy();
  });

  it('should handle click', () => {
    wrapper.instance().handleClick();
    expect(wrapper.state('showMenu')).toBeTruthy();
  });
});
