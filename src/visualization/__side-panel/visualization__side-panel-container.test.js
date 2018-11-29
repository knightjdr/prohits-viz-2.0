import React from 'react';
import { shallow } from 'enzyme';

import { SidePanelContainer } from './visualization__side-panel-container';

const togglePanel = jest.fn();

describe('Visualization panel container', () => {
  it('should not toggle panel when viewport is > 768px', () => {
    global.innerWidth = 769;
    shallow(
      <SidePanelContainer
        changeTab={jest.fn()}
        panel
        tab="info"
        toggleSidePanel={togglePanel}
        update={{
          animationDuration: 0,
          transitionDuration: 0,
        }}
      />,
    );
    expect(togglePanel).not.toHaveBeenCalled();
  });

  it('should toggle panel when viewport is 768px or less', () => {
    global.innerWidth = 768;
    shallow(
      <SidePanelContainer
        changeTab={jest.fn()}
        panel
        tab="info"
        toggleSidePanel={togglePanel}
        update={{
          animationDuration: 0,
          transitionDuration: 0,
        }}
      />,
    );
    expect(togglePanel).toHaveBeenCalled();
  });
});
