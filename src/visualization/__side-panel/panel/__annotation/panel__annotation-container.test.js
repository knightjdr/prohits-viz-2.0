import React from 'react';
import { shallow } from 'enzyme';

import { AnnotationContainer } from './panel__annotation-container';

const placeAnnotation = jest.fn();
const setAnnotationColor = jest.fn();
const setMarkerColor = jest.fn();

beforeEach(() => {
  /* Clear call count */
  placeAnnotation.mockClear();
  setAnnotationColor.mockClear();
  setMarkerColor.mockClear();
});

describe('Annotation container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <AnnotationContainer
        annotations={{
          color: '#ff0000',
          fontSize: 12,
          show: true,
        }}
        clearAllAnnotations={jest.fn()}
        clearAllMarkers={jest.fn()}
        clearLastAnnotation={jest.fn()}
        clearLastMarker={jest.fn()}
        clearSearch={jest.fn()}
        dimensions={{
          columns: 50,
          pageX: 25,
          pageY: 25,
          rows: 50,
        }}
        markers={{
          color: '#000000',
          record: false,
          show: true,
        }}
        placeAnnotation={placeAnnotation}
        position={{
          x: 10,
          y: 10,
        }}
        search={{
          match: false,
          searched: false,
          term: '',
        }}
        searchGenes={jest.fn()}
        setAnnotationColor={setAnnotationColor}
        setAnnotationSize={jest.fn()}
        setMarkerColor={setMarkerColor}
        setSearchTerm={jest.fn()}
        tab="main"
        toggleAnnotations={jest.fn()}
        toggleRecordMarker={jest.fn()}
        toggleMarkers={jest.fn()}
      />,
    );
  });

  it('should call add annotation prop method via component method', () => {
    wrapper.setState({ annotation: 'test annotation' });
    wrapper.instance().addAnnotation();
    expect(placeAnnotation).toHaveBeenCalledWith('test annotation');
  });

  it('should close annotation color picker', () => {
    wrapper.setState({ showAnnotationPicker: true });
    wrapper.instance().closeAnnotationColorPicker();
    expect(wrapper.state('showAnnotationPicker')).toBeFalsy();
  });

  it('should close marker color picker', () => {
    wrapper.setState({ showMarkerPicker: true });
    wrapper.instance().closeMarkerColorPicker();
    expect(wrapper.state('showMarkerPicker')).toBeFalsy();
  });

  it('should call annotation color prop method via component method', () => {
    wrapper.instance().handleAnnotationColor({ hex: '#ffffff' });
    expect(setAnnotationColor).toHaveBeenCalledWith('#ffffff');
  });

  it('should call marker color prop method via component method', () => {
    wrapper.instance().handleMarkerColor({ hex: '#ffffff' });
    expect(setMarkerColor).toHaveBeenCalledWith('#ffffff');
  });

  it('should toggle annotation color picker', () => {
    wrapper.setState({ showAnnotationPicker: true });
    wrapper.instance().toggleAnnotationColorPicker();
    expect(wrapper.state('showAnnotationPicker')).toBeFalsy();
  });

  it('should toggle marker color picker', () => {
    wrapper.setState({ showMarkerPicker: true });
    wrapper.instance().toggleMarkerColorPicker();
    expect(wrapper.state('showMarkerPicker')).toBeFalsy();
  });

  it('should update annotation state', () => {
    wrapper.instance().updateAnnotation({ target: { value: 'another annotation' } });
    expect(wrapper.state('annotation')).toBe('another annotation');
  });
});
