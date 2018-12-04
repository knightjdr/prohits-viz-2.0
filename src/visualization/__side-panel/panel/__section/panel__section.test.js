import React from 'react';
import { shallow } from 'enzyme';

import PanelSection from './panel__section';

describe('Panel section', () => {
  describe('with border and title', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <PanelSection
          border
          title="test"
        >
          children
        </PanelSection>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have border', () => {
      expect(wrapper.find('.panel__section-border').length).toBe(1);
    });

    it('should have title', () => {
      expect(wrapper.find('.panel__section-title').length).toBe(1);
    });
  });

  describe('without border', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <PanelSection
          border={false}
          title="test"
        >
          children
        </PanelSection>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not have border', () => {
      expect(wrapper.find('.panel__section-border').length).toBe(0);
    });
  });

  describe('without title', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <PanelSection border>
          children
        </PanelSection>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not have title', () => {
      expect(wrapper.find('.panel__section-title').length).toBe(0);
    });
  });
});
