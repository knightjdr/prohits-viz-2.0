import React from 'react';
import { shallow } from 'enzyme';

import Annotations from './panel__annotation-annotations';

const addAnnotation = jest.fn();
const clearAllAnnotations = jest.fn();
const clearLastAnnotation = jest.fn();
const toggleAnnotationColorPicker = jest.fn();
const toggleMove = jest.fn();
const updateAnnotation = jest.fn();

describe('Annotation component on annotation panel', () => {
  beforeEach(() => {
    /* Clear call count */
    addAnnotation.mockClear();
    clearAllAnnotations.mockClear();
    clearLastAnnotation.mockClear();
    toggleAnnotationColorPicker.mockClear();
    toggleMove.mockClear();
    updateAnnotation.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Annotations
        addAnnotation={addAnnotation}
        annotation=""
        annotationColor="#ff0000"
        clearAllAnnotations={clearAllAnnotations}
        clearLastAnnotation={clearLastAnnotation}
        closeAnnotationColorPicker={jest.fn()}
        handleAnnotationColor={jest.fn()}
        move={false}
        showAnnotationPicker={false}
        toggleAnnotationColorPicker={toggleAnnotationColorPicker}
        toggleMove={toggleMove}
        updateAnnotation={updateAnnotation}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with move toggle on and color picker rendered', () => {
    const wrapper = shallow(
      <Annotations
        addAnnotation={addAnnotation}
        annotation=""
        annotationColor="#ff0000"
        clearAllAnnotations={clearAllAnnotations}
        clearLastAnnotation={clearLastAnnotation}
        closeAnnotationColorPicker={jest.fn()}
        handleAnnotationColor={jest.fn()}
        move
        showAnnotationPicker
        toggleAnnotationColorPicker={toggleAnnotationColorPicker}
        toggleMove={toggleMove}
        updateAnnotation={updateAnnotation}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger update annotation prop method when input changes', () => {
    const wrapper = shallow(
      <Annotations
        addAnnotation={addAnnotation}
        annotation=""
        annotationColor="#ff0000"
        clearAllAnnotations={clearAllAnnotations}
        clearLastAnnotation={clearLastAnnotation}
        closeAnnotationColorPicker={jest.fn()}
        handleAnnotationColor={jest.fn()}
        move={false}
        showAnnotationPicker={false}
        toggleAnnotationColorPicker={toggleAnnotationColorPicker}
        toggleMove={toggleMove}
        updateAnnotation={updateAnnotation}
      />,
    );
    wrapper.find('Input').simulate('change');
    expect(updateAnnotation).toHaveBeenCalledTimes(1);
  });

  it('should trigger add annotation prop method when button clicked', () => {
    const wrapper = shallow(
      <Annotations
        addAnnotation={addAnnotation}
        annotation=""
        annotationColor="#ff0000"
        clearAllAnnotations={clearAllAnnotations}
        clearLastAnnotation={clearLastAnnotation}
        closeAnnotationColorPicker={jest.fn()}
        handleAnnotationColor={jest.fn()}
        move={false}
        showAnnotationPicker={false}
        toggleAnnotationColorPicker={toggleAnnotationColorPicker}
        toggleMove={toggleMove}
        updateAnnotation={updateAnnotation}
      />,
    );
    wrapper.find('button').first().simulate('click');
    expect(addAnnotation).toHaveBeenCalledTimes(1);
  });

  it('should trigger toggle color picker prop method when button clicked', () => {
    const wrapper = shallow(
      <Annotations
        addAnnotation={addAnnotation}
        annotation=""
        annotationColor="#ff0000"
        clearAllAnnotations={clearAllAnnotations}
        clearLastAnnotation={clearLastAnnotation}
        closeAnnotationColorPicker={jest.fn()}
        handleAnnotationColor={jest.fn()}
        move={false}
        showAnnotationPicker={false}
        toggleAnnotationColorPicker={toggleAnnotationColorPicker}
        toggleMove={toggleMove}
        updateAnnotation={updateAnnotation}
      />,
    );
    wrapper.find('button').at(1).simulate('click');
    expect(toggleAnnotationColorPicker).toHaveBeenCalledTimes(1);
  });

  it('should trigger toggle move prop method when switch changed', () => {
    const wrapper = shallow(
      <Annotations
        addAnnotation={addAnnotation}
        annotation=""
        annotationColor="#ff0000"
        clearAllAnnotations={clearAllAnnotations}
        clearLastAnnotation={clearLastAnnotation}
        closeAnnotationColorPicker={jest.fn()}
        handleAnnotationColor={jest.fn()}
        move={false}
        showAnnotationPicker={false}
        toggleAnnotationColorPicker={toggleAnnotationColorPicker}
        toggleMove={toggleMove}
        updateAnnotation={updateAnnotation}
      />,
    );
    wrapper.find('Switch').simulate('change');
    expect(toggleMove).toHaveBeenCalledTimes(1);
  });

  it('should trigger clear last prop method when button clicked', () => {
    const wrapper = shallow(
      <Annotations
        addAnnotation={addAnnotation}
        annotation=""
        annotationColor="#ff0000"
        clearAllAnnotations={clearAllAnnotations}
        clearLastAnnotation={clearLastAnnotation}
        closeAnnotationColorPicker={jest.fn()}
        handleAnnotationColor={jest.fn()}
        move={false}
        showAnnotationPicker={false}
        toggleAnnotationColorPicker={toggleAnnotationColorPicker}
        toggleMove={toggleMove}
        updateAnnotation={updateAnnotation}
      />,
    );
    wrapper.find('button').at(2).simulate('click');
    expect(clearLastAnnotation).toHaveBeenCalledTimes(1);
  });

  it('should trigger clear all prop method when button clicked', () => {
    const wrapper = shallow(
      <Annotations
        addAnnotation={addAnnotation}
        annotation=""
        annotationColor="#ff0000"
        clearAllAnnotations={clearAllAnnotations}
        clearLastAnnotation={clearLastAnnotation}
        closeAnnotationColorPicker={jest.fn()}
        handleAnnotationColor={jest.fn()}
        move={false}
        showAnnotationPicker={false}
        toggleAnnotationColorPicker={toggleAnnotationColorPicker}
        toggleMove={toggleMove}
        updateAnnotation={updateAnnotation}
      />,
    );
    wrapper.find('button').last().simulate('click');
    expect(clearAllAnnotations).toHaveBeenCalledTimes(1);
  });
});
