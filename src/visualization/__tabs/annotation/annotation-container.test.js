import React from 'react';
import { shallow } from 'enzyme';

import { AnnotationContainer } from './annotation-container';

const placeAnnotation = jest.fn();
const setGoAnnotation = jest.fn();

describe('AnnotationContainer', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <AnnotationContainer
        clearGoAnnotation={jest.fn()}
        go={{ annotation: 'annotation' }}
        placeAnnotation={placeAnnotation}
        setGoAnnotation={setGoAnnotation}
      />,
    );
  });

  it('should call prop method from handleChange', () => {
    setGoAnnotation.mockClear();
    wrapper.instance().handleChange({ target: { value: 'test' } });
    expect(setGoAnnotation).toHaveBeenCalledWith('test');
  });

  describe('adding annotation on click', () => {
    it('should add annotation when go annotation prop defined', () => {
      placeAnnotation.mockClear();
      wrapper.instance().handleClick();
      expect(placeAnnotation).toHaveBeenCalled();
    });

    it('should not add annotation when go annotation prop is falsy', () => {
      wrapper.setProps({
        go: { annotation: '' },
      });
      placeAnnotation.mockClear();
      wrapper.instance().handleClick();
      expect(placeAnnotation).not.toHaveBeenCalled();
    });
  });
});
