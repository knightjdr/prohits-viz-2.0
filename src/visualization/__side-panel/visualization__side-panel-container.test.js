import React from 'react';
import { shallow } from 'enzyme';

import { SidePanelContainer } from './visualization__side-panel-container';

describe('Visualization panel container', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <SidePanelContainer
        changeTab={jest.fn()}
        panel
        tab="info"
        toggleSidePanel={jest.fn()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
