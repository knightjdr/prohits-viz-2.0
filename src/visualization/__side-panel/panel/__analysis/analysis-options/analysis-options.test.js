import React from 'react';
import { shallow } from 'enzyme';

import Options from './analysis-options';

const handleType = jest.fn();
const performAnalysis = jest.fn();

describe('Analysis options panel', () => {
  describe('with type specified', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Options
          handleType={handleType}
          performAnalysis={performAnalysis}
          type="go"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set select value to prop type', () => {
      expect(wrapper.find('Select').props().value).toBe('go');
    });

    it('should call handleType on select change', () => {
      wrapper.find('Select').simulate('change');
      expect(handleType).toHaveBeenCalled();
    });

    it('should call performAnalysis on button click', () => {
      wrapper.find('Button').simulate('click');
      expect(performAnalysis).toHaveBeenCalled();
    });
  });

  describe('without type specified', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Options
          handleType={handleType}
          performAnalysis={performAnalysis}
          type=""
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not show button', () => {
      expect(wrapper.find('Button').length).toBe(0);
    });
  });
});
