import React from 'react';
import { shallow } from 'enzyme';

import Markers from './panel__annotation-markers';

const clearAllMarkers = jest.fn();
const clearLastMarker = jest.fn();
const toggleMarkerColorPicker = jest.fn();
const toggleMarkers = jest.fn();
const toggleRecord = jest.fn();

beforeEach(() => {
  /* Clear call count */
  clearAllMarkers.mockClear();
  clearLastMarker.mockClear();
  toggleMarkerColorPicker.mockClear();
  toggleMarkers.mockClear();
  toggleRecord.mockClear();
});

describe('Marker component on annotation panel', () => {
  describe('should render', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Markers
          clearAllMarkers={clearAllMarkers}
          clearLastMarker={clearLastMarker}
          closeMarkerColorPicker={jest.fn()}
          handleMarkerColor={jest.fn()}
          markerColor="#000000"
          record={false}
          showMarkerPicker={false}
          showMarkersPicker={false}
          toggleMarkerColorPicker={toggleMarkerColorPicker}
          toggleMarkers={toggleMarkers}
          toggleRecord={toggleRecord}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and trigger toggle markers prop method when switch changes', () => {
      wrapper.find('Switch').first().simulate('change');
      expect(toggleMarkers).toHaveBeenCalledTimes(1);
    });

    it('and trigger toggleRecord prop method when switch changes', () => {
      wrapper.find('Switch').last().simulate('change');
      expect(toggleRecord).toHaveBeenCalledTimes(1);
    });

    it('and trigger color picker prop method when button clicked', () => {
      wrapper.find('button').first().simulate('click');
      expect(toggleMarkerColorPicker).toHaveBeenCalledTimes(1);
    });

    it('and trigger clear last prop method when button clicked', () => {
      wrapper.find('button').at(1).simulate('click');
      expect(clearLastMarker).toHaveBeenCalledTimes(1);
    });

    it('and trigger clear all prop method when button clicked', () => {
      wrapper.find('button').last().simulate('click');
      expect(clearAllMarkers).toHaveBeenCalledTimes(1);
    });
  });

  describe('should render with color picker and toggles on', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Markers
          clearAllMarkers={clearAllMarkers}
          clearLastMarker={clearLastMarker}
          closeMarkerColorPicker={jest.fn()}
          handleMarkerColor={jest.fn()}
          markerColor="#000000"
          record
          showMarkerPicker
          showMarkersPicker
          toggleMarkerColorPicker={toggleMarkerColorPicker}
          toggleMarkers={toggleMarkers}
          toggleRecord={toggleRecord}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
