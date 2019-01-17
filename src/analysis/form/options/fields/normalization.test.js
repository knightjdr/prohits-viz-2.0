import React from 'react';
import { shallow } from 'enzyme';

import Normalization from './normalization';

describe('Normalization', () => {
  describe('default', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Normalization
          analysisType="dotplot"
          normalization="total"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not display readout menu', () => {
      expect(wrapper.find({ label: 'Readout for normalization' }).length).toEqual(0);
    });
  });

  describe('readout normalization', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Normalization
          analysisType="dotplot"
          normalization="readout"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display readout menu', () => {
      expect(wrapper.find({ label: 'Readout for normalization' }).length).toEqual(1);
    });
  });
});
