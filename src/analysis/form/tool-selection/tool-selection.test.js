import React from 'react';
import { shallow } from 'enzyme';

import { ToolSelectionComponent } from './tool-selection';

describe('ToolSelectionComponent', () => {
  test('Renders item without selected analysis type', () => {
    const wrapper = shallow(
      <ToolSelectionComponent
        form={{}}
        getFieldDecorator={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Renders item with selected analysis type', () => {
    const wrapper = shallow(
      <ToolSelectionComponent
        form={{ analysisType: 'dotplot' }}
        getFieldDecorator={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    // opens an info Alert box
    expect(wrapper.find('.ToolSelection-tool-description').length).toBe(1);
    const alertProps = wrapper.find('Alert').props();
    expect(alertProps.type).toEqual('info');
  });
});
