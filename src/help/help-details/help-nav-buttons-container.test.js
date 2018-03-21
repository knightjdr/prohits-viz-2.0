import React from 'react';
import { shallow } from 'enzyme';

import HelpRoutesMap from '../help-routes/help-routes-map';
import { HelpNavButtonsContainer } from './help-nav-buttons-container';

// mock help-routes
jest.mock('../help-routes/help-routes-map');

const location = {
  pathname: '/help',
};

describe('HelpNavButtonsContainer', () => {
  test('State set initially', () => {
    const wrapper = shallow(
      <HelpNavButtonsContainer location={location} />,
    );
    expect(wrapper.state('navBackward')).toBeNull();
    expect(wrapper.state('navForward')).toBe('/help/tools');
  });

  test('getBackRoute gets route of previous page', () => {
    const wrapper = shallow(
      <HelpNavButtonsContainer location={location} />,
    );
    expect(wrapper.instance().getBackRoute(0)).toBeNull();
    expect(wrapper.instance().getBackRoute(1)).toBe('/help');
    expect(wrapper.instance().getBackRoute(2)).toBe('/help/tools');
  });

  test('getForwardRoute gets route of next page', () => {
    const wrapper = shallow(
      <HelpNavButtonsContainer location={location} />,
    );
    expect(wrapper.instance().getForwardRoute(0)).toBe('/help/tools');
    expect(wrapper.instance().getForwardRoute(1)).toBeNull();
  });

  test('updateNavButtons called on props change', () => {
    const wrapper = shallow(
      <HelpNavButtonsContainer location={location} />,
    );
    const spy = jest.spyOn(wrapper.instance(), 'updateNavButtons');
    wrapper.setProps({ location: { pathname: '/help/tools' } });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('/help/tools', '/help');
  });

  test('updateNavButtons updates state when route changes', () => {
    const wrapper = shallow(
      <HelpNavButtonsContainer location={location} />,
    );
    const spy = jest.spyOn(wrapper.instance(), 'setState');
    // changing path should call setState
    wrapper.instance().updateNavButtons('/help/tools', '/help');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state('navBackward')).toBe('/help');
    expect(wrapper.state('navForward')).toBeNull();
    // if the path is the same, setState should not be called
    jest.resetAllMocks();
    wrapper.instance().updateNavButtons('/help/test', '/help/test');
    expect(spy).not.toHaveBeenCalled();
  });
});
