import React from 'react';
import { shallow } from 'enzyme';

import Markers from './panel__annotation-markers';

const clearAllMarkers = jest.fn();
const clearLastMarker = jest.fn();
const toggleMarkerColorPicker = jest.fn();
const toggleRecord = jest.fn();

describe('Marker component on annotation panel', () => {
  beforeEach(() => {
    /* Clear call count */
    clearAllMarkers.mockClear();
    clearLastMarker.mockClear();
    toggleMarkerColorPicker.mockClear();
    toggleRecord.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Markers
        clearAllMarkers={clearAllMarkers}
        clearLastMarker={clearLastMarker}
        closeMarkerColorPicker={jest.fn()}
        handleMarkerColor={jest.fn()}
        markerColor="#000000"
        record={false}
        showMarkerPicker={false}
        toggleMarkerColorPicker={toggleMarkerColorPicker}
        toggleRecord={toggleRecord}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with record toggle on and color picker rendered', () => {
    const wrapper = shallow(
      <Markers
        clearAllMarkers={clearAllMarkers}
        clearLastMarker={clearLastMarker}
        closeMarkerColorPicker={jest.fn()}
        handleMarkerColor={jest.fn()}
        markerColor="#000000"
        record
        showMarkerPicker
        toggleMarkerColorPicker={toggleMarkerColorPicker}
        toggleRecord={toggleRecord}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger toggleRecord prop method when switch changes', () => {
    const wrapper = shallow(
      <Markers
        clearAllMarkers={clearAllMarkers}
        clearLastMarker={clearLastMarker}
        closeMarkerColorPicker={jest.fn()}
        handleMarkerColor={jest.fn()}
        markerColor="#000000"
        record={false}
        showMarkerPicker={false}
        toggleMarkerColorPicker={toggleMarkerColorPicker}
        toggleRecord={toggleRecord}
      />,
    );
    wrapper.find('Switch').simulate('change');
    expect(toggleRecord).toHaveBeenCalledTimes(1);
  });

  it('should trigger color picker prop method when button clicked', () => {
    const wrapper = shallow(
      <Markers
        clearAllMarkers={clearAllMarkers}
        clearLastMarker={clearLastMarker}
        closeMarkerColorPicker={jest.fn()}
        handleMarkerColor={jest.fn()}
        markerColor="#000000"
        record={false}
        showMarkerPicker={false}
        toggleMarkerColorPicker={toggleMarkerColorPicker}
        toggleRecord={toggleRecord}
      />,
    );
    wrapper.find('button').first().simulate('click');
    expect(toggleMarkerColorPicker).toHaveBeenCalledTimes(1);
  });

  it('should trigger clear last prop method when button clicked', () => {
    const wrapper = shallow(
      <Markers
        clearAllMarkers={clearAllMarkers}
        clearLastMarker={clearLastMarker}
        closeMarkerColorPicker={jest.fn()}
        handleMarkerColor={jest.fn()}
        markerColor="#000000"
        record={false}
        showMarkerPicker={false}
        toggleMarkerColorPicker={toggleMarkerColorPicker}
        toggleRecord={toggleRecord}
      />,
    );
    wrapper.find('button').at(1).simulate('click');
    expect(clearLastMarker).toHaveBeenCalledTimes(1);
  });

  it('should trigger clear all prop method when button clicked', () => {
    const wrapper = shallow(
      <Markers
        clearAllMarkers={clearAllMarkers}
        clearLastMarker={clearLastMarker}
        closeMarkerColorPicker={jest.fn()}
        handleMarkerColor={jest.fn()}
        markerColor="#000000"
        record={false}
        showMarkerPicker={false}
        toggleMarkerColorPicker={toggleMarkerColorPicker}
        toggleRecord={toggleRecord}
      />,
    );
    wrapper.find('button').last().simulate('click');
    expect(clearAllMarkers).toHaveBeenCalledTimes(1);
  });
});
