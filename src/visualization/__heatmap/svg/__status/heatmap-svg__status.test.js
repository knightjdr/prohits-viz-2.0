import React from 'react';
import { shallow } from 'enzyme';

import Status from './heatmap-svg__status';

const toggleMenu = jest.fn();

describe('Status view', () => {
  describe('when visible', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Status
          canTranslate
          download={jest.fn()}
          elPosition={{
            right: 50,
            top: 100,
          }}
          expand
          fixLeft
          reset={jest.fn()}
          selectionBoxActive
          show
          showSelectionToggle
          toggleMenu={toggleMenu}
          toggleSelectionBox={jest.fn()}
          toggleTooltips={jest.fn()}
          tooltipsActive
          translate={jest.fn()}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have right postion defined by prop', () => {
      expect(wrapper.props().style.right).toBe(50);
    });

    it('should have top postion defined by prop', () => {
      expect(wrapper.props().style.top).toBe(100);
    });

    it('should be visible', () => {
      expect(wrapper.props().style.visibility).toBe('visible');
    });

    it('should toggle menu on click', () => {
      wrapper.find('Button').simulate('click');
      expect(toggleMenu).toHaveBeenCalled();
    });
  });

  describe('when hidden', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Status
          canTranslate
          download={jest.fn()}
          elPosition={{
            right: 50,
            top: 100,
          }}
          expand
          fixLeft
          reset={jest.fn()}
          selectionBoxActive
          show={false}
          showSelectionToggle
          toggleMenu={toggleMenu}
          toggleSelectionBox={jest.fn()}
          toggleTooltips={jest.fn()}
          tooltipsActive
          translate={jest.fn()}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should be visible', () => {
      expect(wrapper.props().style.visibility).toBe('hidden');
    });
  });
});
