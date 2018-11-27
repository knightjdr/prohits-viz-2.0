import React from 'react';
import { shallow } from 'enzyme';

import SelectType from './visualization__select-type';

describe('Visualization control', () => {
  describe('when vizType is null', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(
        <SelectType
          handleFile={jest.fn()}
          loading={false}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display selection component', () => {
      expect(wrapper.find('Selection').length).toBe(1);
    });
  });

  describe('when vizType is dotplot', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(
        <SelectType
          handleFile={jest.fn()}
          loading={false}
          vizType="dotplot"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display heatmap component', () => {
      expect(wrapper.find('Heatmap').length).toBe(1);
    });
  });

  describe('when vizType is heatmap', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(
        <SelectType
          handleFile={jest.fn()}
          loading={false}
          vizType="heatmap"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display heatmap component', () => {
      expect(wrapper.find('Heatmap').length).toBe(1);
    });
  });

  describe('when vizType is pie', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(
        <SelectType
          handleFile={jest.fn()}
          loading={false}
          vizType="pie"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display pie plot component', () => {
      expect(wrapper.find('Pie').length).toBe(1);
    });
  });

  describe('when vizType is scatter', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(
        <SelectType
          handleFile={jest.fn()}
          loading={false}
          vizType="scatter"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display scatter plot component', () => {
      expect(wrapper.find('ScatterContainer').length).toBe(1);
    });
  });
});
