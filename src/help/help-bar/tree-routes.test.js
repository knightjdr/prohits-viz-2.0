import React from 'react';
import { shallow } from 'enzyme';
import { TreeRoutesComponent } from './tree-routes';

// mock expandNode
const expandNode = jest.fn();

describe('TreeRoutes', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <TreeRoutesComponent
        expandNode={expandNode}
        expandedRoutes={['/help']}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
