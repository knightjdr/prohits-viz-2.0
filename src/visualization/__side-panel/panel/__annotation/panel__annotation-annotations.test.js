import React from 'react';
import { shallow } from 'enzyme';

import Annotations from './panel__annotation-annotations';

const addAnnotation = jest.fn();
const clearAllAnnotations = jest.fn();
const clearLastAnnotation = jest.fn();
const handleAnnotationSize = jest.fn();
const toggleAnnotationColorPicker = jest.fn();
const toggleShow = jest.fn();
const updateAnnotation = jest.fn();

beforeEach(() => {
  /* Clear call count */
  addAnnotation.mockClear();
  clearAllAnnotations.mockClear();
  clearLastAnnotation.mockClear();
  handleAnnotationSize.mockClear();
  toggleAnnotationColorPicker.mockClear();
  toggleShow.mockClear();
  updateAnnotation.mockClear();
});

describe('Annotation component on annotation panel', () => {
  describe('should render', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Annotations
          addAnnotation={addAnnotation}
          annotation=""
          annotationColor="#ff0000"
          clearAllAnnotations={clearAllAnnotations}
          clearLastAnnotation={clearLastAnnotation}
          closeAnnotationColorPicker={jest.fn()}
          fontSize={12}
          handleAnnotationColor={jest.fn()}
          handleAnnotationSize={handleAnnotationSize}
          show={false}
          showAnnotationPicker={false}
          toggleAnnotationColorPicker={toggleAnnotationColorPicker}
          toggleShow={toggleShow}
          updateAnnotation={updateAnnotation}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('and trigger update annotation prop method when input changes', () => {
      wrapper.find('Input').simulate('change');
      expect(updateAnnotation).toHaveBeenCalledTimes(1);
    });

    it('and trigger update font size prop method when input changes', () => {
      wrapper.find('InputNumber').simulate('change');
      expect(handleAnnotationSize).toHaveBeenCalledTimes(1);
    });

    it('and trigger add annotation prop method when button clicked', () => {
      wrapper.find('button').first().simulate('click');
      expect(addAnnotation).toHaveBeenCalledTimes(1);
    });

    it('and trigger toggle color picker prop method when button clicked', () => {
      wrapper.find('button').at(1).simulate('click');
      expect(toggleAnnotationColorPicker).toHaveBeenCalledTimes(1);
    });

    it('and trigger toggle show prop method when switch changed', () => {
      wrapper.find('Switch').simulate('change');
      expect(toggleShow).toHaveBeenCalledTimes(1);
    });

    it('and trigger clear last prop method when button clicked', () => {
      wrapper.find('button').at(2).simulate('click');
      expect(clearLastAnnotation).toHaveBeenCalledTimes(1);
    });

    it('and trigger clear all prop method when button clicked', () => {
      wrapper.find('button').last().simulate('click');
      expect(clearAllAnnotations).toHaveBeenCalledTimes(1);
    });
  });

  describe('should render with color picker and toggle on', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Annotations
          addAnnotation={addAnnotation}
          annotation=""
          annotationColor="#ff0000"
          clearAllAnnotations={clearAllAnnotations}
          clearLastAnnotation={clearLastAnnotation}
          closeAnnotationColorPicker={jest.fn()}
          fontSize={12}
          handleAnnotationColor={jest.fn()}
          handleAnnotationSize={handleAnnotationSize}
          show
          showAnnotationPicker
          toggleAnnotationColorPicker={toggleAnnotationColorPicker}
          toggleShow={toggleShow}
          updateAnnotation={updateAnnotation}
        />,
      );
    });

    it('and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
