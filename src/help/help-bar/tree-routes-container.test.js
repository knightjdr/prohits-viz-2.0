import React from 'react';
import { shallow } from 'enzyme';

import RoutesFromPath from '../../helpers/routes-from-path';
import { TreeRoutesContainer } from './tree-routes-container';

// mock RoutesFromPath
jest.mock('../../helpers/routes-from-path');
RoutesFromPath.mockReturnValue(['/help', '/help/tools']);

const location = {
  pathname: '/help/tools',
};
const node = {
  expanded: {
    node: {
      props: {
        eventKey: '/help/tools',
        expanded: true,
      },
    },
  },
  notExpanded: {
    node: {
      props: {
        eventKey: '/help/tools',
        expanded: false,
      },
    },
  },
};

describe('TreeRoutesContainer', () => {
  test('expandedRoutes initially set', () => {
    const wrapper = shallow(
      <TreeRoutesContainer location={location} />,
    );
    expect(wrapper.state('expandedRoutes')).toEqual(['/help', '/help/tools']);
  });

  test('expandNodes sets state', () => {
    const wrapper = shallow(
      <TreeRoutesContainer location={location} />,
    );
    // if node is expanded, it should be removed from expadedRoutes
    wrapper.instance().expandNode(null, node.expanded);
    expect(wrapper.state('expandedRoutes')).toEqual(['/help']);
    // if node is not expanded, it should be added from expadedRoutes
    wrapper.instance().expandNode(null, node.notExpanded);
    expect(wrapper.state('expandedRoutes')).toEqual(['/help', '/help/tools']);
    // if node is expanded but is asked to expand again, state doesn't change
    wrapper.instance().expandNode(null, node.notExpanded);
    expect(wrapper.state('expandedRoutes')).toEqual(['/help', '/help/tools']);
  });

  test('changeExpandedRoutes called on props change', () => {
    const wrapper = shallow(
      <TreeRoutesContainer location={location} />,
    );
    const spy = jest.spyOn(wrapper.instance(), 'changeExpandedRoutes');
    wrapper.setProps({ location: { pathname: '/help/test' } });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('/help/test', '/help/tools');
  });

  test('changeExpandedRoutes updates state when route changes', () => {
    RoutesFromPath.mockReturnValue(['/help', '/help/test']);
    const wrapper = shallow(
      <TreeRoutesContainer location={location} />,
    );
    const spy = jest.spyOn(wrapper.instance(), 'setState');
    // changing path should call setState
    wrapper.instance().changeExpandedRoutes('/help/test', '/help/tools');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state('expandedRoutes')).toEqual(['/help', '/help/test']);
    // if the path is the same, setState should not be called
    jest.resetAllMocks();
    wrapper.instance().changeExpandedRoutes('/help/test', '/help/test');
    expect(spy).not.toHaveBeenCalled();
  });
});
