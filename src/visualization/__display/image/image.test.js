import React from 'react';
import { shallow } from 'enzyme';

import Image from './image';

describe('Visualization image', () => {
  describe('with error', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Image
          error
          loading={false}
          vizType="heatmap"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render status component', () => {
      expect(wrapper.find('Status').length).toBe(1);
    });
  });

  describe('when loading', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Image
          error={false}
          loading
          vizType="heatmap"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render status component', () => {
      expect(wrapper.find('Status').length).toBe(1);
    });
  });

  describe('for circHeatmap images', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Image
          error={false}
          loading={false}
          vizType="circ-heatmap"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render circHeatmap component', () => {
      expect(wrapper.find('CircHeatmap').length).toBe(1);
    });
  });

  describe('for scatter images', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Image
          error={false}
          loading={false}
          vizType="scatter"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render scatter component', () => {
      expect(wrapper.find('ScatterContainer').length).toBe(1);
    });
  });

  describe('for other image types', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Image
          error={false}
          loading={false}
          vizType="other"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render scatter component', () => {
      expect(wrapper.find('Heatmap').length).toBe(1);
    });
  });
});
