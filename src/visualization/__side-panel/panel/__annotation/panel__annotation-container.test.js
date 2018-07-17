import React from 'react';
import { shallow } from 'enzyme';

import { AnnotationContainer } from './panel__annotation-container';

const addAnnotation = jest.fn();
const setAnnotationColor = jest.fn();
const setMarkerColor = jest.fn();

const props = {
  annotations: {
    color: '#ff0000',
    move: false,
  },
  clearAllAnnotations: jest.fn(),
  clearAllMarkers: jest.fn(),
  clearLastAnnotation: jest.fn(),
  clearLastMarker: jest.fn(),
  clearSearch: jest.fn(),
  markers: {
    color: '#000000',
    record: false,
  },
  position: {
    x: 0,
    y: 0,
  },
  search: {
    term: '',
  },
  setSearchTerm: jest.fn(),
  toggleMoveAnnotation: jest.fn(),
  toggleRecordMarker: jest.fn(),
};

describe('Annotation container', () => {
  beforeEach(() => {
    /* Clear call count */
    addAnnotation.mockClear();
    setAnnotationColor.mockClear();
    setMarkerColor.mockClear();
  });

  it('should have a blank/empty default state', () => {
    const wrapper = shallow(
      <AnnotationContainer
        {...props}
        addAnnotation={addAnnotation}
        setAnnotationColor={setAnnotationColor}
        setMarkerColor={setMarkerColor}
      />,
    );
    expect(wrapper.state('annotation')).toBe('');
    expect(wrapper.state('showAnnotationPicker')).toBeFalsy();
    expect(wrapper.state('showMarkerPicker')).toBeFalsy();
  });

  it('should call add annotation prop method via state method', () => {
    const wrapper = shallow(
      <AnnotationContainer
        {...props}
        addAnnotation={addAnnotation}
        setAnnotationColor={setAnnotationColor}
        setMarkerColor={setMarkerColor}
      />,
    );
    wrapper.setState({ annotation: 'test annotation' });
    wrapper.instance().addAnnotation();
    expect(addAnnotation).toHaveBeenCalledWith('test annotation', 0, 0);
  });

  it('should close annotation color picker', () => {
    const wrapper = shallow(
      <AnnotationContainer
        {...props}
        addAnnotation={addAnnotation}
        setAnnotationColor={setAnnotationColor}
        setMarkerColor={setMarkerColor}
      />,
    );
    wrapper.setState({ showAnnotationPicker: true });
    expect(wrapper.state('showAnnotationPicker')).toBeTruthy();
    wrapper.instance().closeAnnotationColorPicker();
    expect(wrapper.state('showAnnotationPicker')).toBeFalsy();
  });

  it('should close marker color picker', () => {
    const wrapper = shallow(
      <AnnotationContainer
        {...props}
        addAnnotation={addAnnotation}
        setAnnotationColor={setAnnotationColor}
        setMarkerColor={setMarkerColor}
      />,
    );
    wrapper.setState({ showMarkerPicker: true });
    expect(wrapper.state('showMarkerPicker')).toBeTruthy();
    wrapper.instance().closeMarkerColorPicker();
    expect(wrapper.state('showMarkerPicker')).toBeFalsy();
  });

  it('should call annotation color prop method via state method', () => {
    const wrapper = shallow(
      <AnnotationContainer
        {...props}
        addAnnotation={addAnnotation}
        setAnnotationColor={setAnnotationColor}
        setMarkerColor={setMarkerColor}
      />,
    );
    wrapper.instance().handleAnnotationColor({ hex: '#ffffff' });
    expect(setAnnotationColor).toHaveBeenCalledWith('#ffffff');
  });

  it('should call marker color prop method via state method', () => {
    const wrapper = shallow(
      <AnnotationContainer
        {...props}
        addAnnotation={addAnnotation}
        setAnnotationColor={setAnnotationColor}
        setMarkerColor={setMarkerColor}
      />,
    );
    wrapper.instance().handleMarkerColor({ hex: '#ffffff' });
    expect(setMarkerColor).toHaveBeenCalledWith('#ffffff');
  });

  it('should toggle annotation color picker', () => {
    const wrapper = shallow(
      <AnnotationContainer
        {...props}
        addAnnotation={addAnnotation}
        setAnnotationColor={setAnnotationColor}
        setMarkerColor={setMarkerColor}
      />,
    );
    wrapper.instance().toggleAnnotationColorPicker();
    expect(wrapper.state('showAnnotationPicker')).toBeTruthy();
    wrapper.instance().toggleAnnotationColorPicker();
    expect(wrapper.state('showAnnotationPicker')).toBeFalsy();
  });

  it('should toggle marker color picker', () => {
    const wrapper = shallow(
      <AnnotationContainer
        {...props}
        addAnnotation={addAnnotation}
        setAnnotationColor={setAnnotationColor}
        setMarkerColor={setMarkerColor}
      />,
    );
    wrapper.instance().toggleMarkerColorPicker();
    expect(wrapper.state('showMarkerPicker')).toBeTruthy();
    wrapper.instance().toggleMarkerColorPicker();
    expect(wrapper.state('showMarkerPicker')).toBeFalsy();
  });

  it('should update annotation state', () => {
    const wrapper = shallow(
      <AnnotationContainer
        {...props}
        addAnnotation={addAnnotation}
        setAnnotationColor={setAnnotationColor}
        setMarkerColor={setMarkerColor}
      />,
    );
    wrapper.instance().updateAnnotation({ target: { value: 'another annotation' } });
    expect(wrapper.state('annotation')).toBe('another annotation');
  });
});
