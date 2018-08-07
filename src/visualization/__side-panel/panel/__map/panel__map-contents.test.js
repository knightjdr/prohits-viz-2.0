import React from 'react';
import { shallow } from 'enzyme';

import MapContent from './panel__map-contents';

const navigatePosition = jest.fn();
const toggleAnnotations = jest.fn();
const toggleMarkers = jest.fn();

describe('Map panel content', () => {
  describe('should render when in sync', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <MapContent
          annotations={{}}
          isSyncing={false}
          markers={{}}
          minimap="image"
          navigatePosition={navigatePosition}
          rangeBox={{}}
          search={{}}
          showAnnotations={false}
          showMarkers={false}
          synced
          syncError={false}
          syncMap={jest.fn()}
          toggleAnnotations={toggleAnnotations}
          toggleMarkers={toggleMarkers}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and render image', () => {
      expect(wrapper.find('Image').length).toBe(1);
    });

    it('and not render sync component', () => {
      expect(wrapper.find('Sync').length).toBe(0);
    });

    it('on clicking switch should trigger toggle annotations function', () => {
      wrapper.find('Switch').first().simulate('change');
      expect(toggleAnnotations).toHaveBeenCalledTimes(1);
    });

    it('on clicking switch should trigger toggle markers function', () => {
      wrapper.find('Switch').last().simulate('change');
      expect(toggleMarkers).toHaveBeenCalledTimes(1);
    });
  });

  describe('should render when in sync with a sync image', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <MapContent
          annotations={{}}
          isSyncing={false}
          markers={{}}
          minimap={null}
          navigatePosition={navigatePosition}
          rangeBox={{}}
          search={{}}
          showAnnotations={false}
          showMarkers={false}
          synced
          syncError={false}
          syncImage="synced"
          syncMap={jest.fn()}
          toggleAnnotations={toggleAnnotations}
          toggleMarkers={toggleMarkers}
        />,
      );
    });

    it('and render image', () => {
      expect(wrapper.find('Image').length).toBe(1);
    });

    it('and not render sync component', () => {
      expect(wrapper.find('Synced').length).toBe(0);
    });
  });

  describe('should render when not in sync', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <MapContent
          annotations={{}}
          isSyncing={false}
          markers={{}}
          minimap="image"
          navigatePosition={navigatePosition}
          rangeBox={{}}
          search={{}}
          showAnnotations={false}
          showMarkers={false}
          synced={false}
          syncError={false}
          syncMap={jest.fn()}
          toggleAnnotations={toggleAnnotations}
          toggleMarkers={toggleMarkers}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and not render image', () => {
      expect(wrapper.find('Image').length).toBe(0);
    });

    it('and render sync component', () => {
      expect(wrapper.find('Synced').length).toBe(1);
    });
  });
});
