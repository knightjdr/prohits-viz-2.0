import React from 'react';
import { shallow } from 'enzyme';

import MapPanel from './panel__map';

const syncMap = jest.fn();
const toggleMapAttach = jest.fn();

describe('Map panel', () => {
  describe('should render when attached to sidepanel', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <MapPanel
          annotations={{}}
          isAttached
          isSyncing={false}
          markers={{}}
          minimap="image"
          navigatePosition={jest.fn()}
          rangeBox={{}}
          search={{}}
          showAnnotations={false}
          showMarkers={false}
          synced
          syncError={false}
          syncMap={syncMap}
          toggleMapAttach={toggleMapAttach}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render contents', () => {
      expect(wrapper.find('MapContent').length).toBe(1);
    });

    it('should not render detached element', () => {
      expect(wrapper.find('.panel__map-detached').length).toBe(0);
    });

    it('should trigger toggle map attach function on click', () => {
      wrapper.find('button').first().simulate('click');
      expect(toggleMapAttach).toHaveBeenCalledTimes(1);
    });

    it('should trigger sync map function on click', () => {
      wrapper.find('button').at(1).simulate('click');
      expect(syncMap).toHaveBeenCalledTimes(1);
    });
  });

  describe('should render when detached from sidepanel', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <MapPanel
          annotations={{}}
          isAttached={false}
          isSyncing={false}
          markers={{}}
          minimap="image"
          navigatePosition={jest.fn()}
          rangeBox={{}}
          search={{}}
          showAnnotations={false}
          showMarkers={false}
          synced
          syncError={false}
          syncMap={jest.fn()}
          toggleMapAttach={toggleMapAttach}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and not render map contents', () => {
      expect(wrapper.find('MapContent').length).toBe(0);
    });

    it('and render detached element', () => {
      expect(wrapper.find('.panel__map-detached').length).toBe(1);
    });
  });
});
