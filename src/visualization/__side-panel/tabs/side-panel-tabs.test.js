import React from 'react';
import { shallow } from 'enzyme';

import SidePanelTabs from './side-panel-tabs';

const togglePanel = jest.fn();

describe('SidePanelTabs', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <SidePanelTabs
        onClick={jest.fn}
        selectedTab="tab"
        tabs={['tab1', 'tab2']}
        togglePanel={togglePanel}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have number of tabs matching tab array prop', () => {
    expect(wrapper.find('SidePanelTab').length).toBe(2);
  });

  it('should call togglePanel', () => {
    togglePanel.mockClear();
    const button = wrapper.find('RoundButton').last();
    button.simulate('click');
    expect(togglePanel).toHaveBeenCalled();
  });
});
