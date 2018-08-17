import React from 'react';
import { shallow } from 'enzyme';

import ContextMenu from './context-menu';

const testRef = React.createRef();

describe('Context menu view', () => {
  describe('when rendered visible', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ContextMenu
          closeMenu={jest.fn}
          height="auto"
          left={0}
          setRef={testRef}
          show
          top={0}
        >
          <div className="child" />
        </ContextMenu>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render children within context menu', () => {
      expect(wrapper.find('.context-menu div.child').length).toBe(1);
    });

    it('should not be opaque', () => {
      expect(wrapper.find('.context-menu').props().style.opacity).toBe(1);
    });

    it('should be visible', () => {
      expect(wrapper.find('.context-menu').props().style.visibility).toBe('visible');
    });

    it('should have pointer events', () => {
      expect(wrapper.find('.context-menu').props().style.pointerEvents).toBe('auto');
    });

    it('should be positioned by props', () => {
      expect(wrapper.find('.context-menu').props().style.height).toBe('auto');
      expect(wrapper.find('.context-menu').props().style.left).toBe(0);
      expect(wrapper.find('.context-menu').props().style.top).toBe(0);
    });
  });

  describe('when rendered hidden', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ContextMenu
          closeMenu={jest.fn}
          height="auto"
          left={0}
          setRef={testRef}
          show={false}
          top={0}
        >
          <div className="child" />
        </ContextMenu>,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should be opaque', () => {
      expect(wrapper.find('.context-menu').props().style.opacity).toBe(0);
    });

    it('should be hidden', () => {
      expect(wrapper.find('.context-menu').props().style.visibility).toBe('hidden');
    });

    it('should not have pointer events', () => {
      expect(wrapper.find('.context-menu').props().style.pointerEvents).toBe('none');
    });
  });
});
