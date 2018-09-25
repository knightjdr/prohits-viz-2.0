import React from 'react';
import { shallow } from 'enzyme';

import Columns from './heatmap-svg__columns';

const handleClick = jest.fn();
const openContextMenu = jest.fn();
const toggleTooltip = jest.fn();

beforeEach(() => {
  handleClick.mockClear();
  openContextMenu.mockClear();
});

describe('Heatmap columns', () => {

  describe('with reference and search term', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Columns
          cellSize={15}
          fontSize={12}
          handleClick={handleClick}
          names={[
            { original: 'a', text: 'a', trimmed: false },
            { original: 'b', text: 'b', trimmed: false },
            { original: 'c', text: 'c', trimmed: false },
          ]}
          openContextMenu={openContextMenu}
          reference="b"
          search={{
            columns: { c: true },
            match: true,
            term: 'c',
          }}
          toggleTooltip={toggleTooltip}
        />,
      );
    });

    it('should render and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render names as text elements', () => {
      expect(wrapper.find('text').length).toBe(3);
    });

    describe('for search match', () => {
      let match;

      beforeAll(() => {
        match = wrapper.findWhere(node => node.key() === 'c-match');
      });

      it('should render as rect element', () => {
        expect(match.type()).toBe('rect');
      });

      it('should open context menu on right click', () => {
        match.simulate('contextmenu', {});
        expect(openContextMenu).toHaveBeenCalledWith({}, 'c');
      });
    });

    describe('for reference', () => {
      let reference;

      beforeAll(() => {
        reference = wrapper.findWhere(node => node.key() === 'b-reference');
      });

      it('should render as rect element', () => {
        expect(reference.type()).toBe('rect');
      });

      it('should open context menu on right click', () => {
        reference.simulate('contextmenu', {});
        expect(openContextMenu).toHaveBeenCalledWith({}, 'b');
      });
    });

    describe('for text', () => {
      let text;

      beforeAll(() => {
        text = wrapper.find('text').first();
      });

      it('should open context menu on right click', () => {
        text.simulate('contextmenu', {});
        expect(openContextMenu).toHaveBeenCalledWith({}, 'a');
      });

      it('should call handleClick prop method on click', () => {
        text.simulate('click', {});
        expect(handleClick).toHaveBeenCalledWith({}, 'a', 'column');
      });

      it('should call tooltip toggle on mouseenter', () => {
        text.simulate('mouseenter', { clientX: 10 });
        expect(toggleTooltip).toHaveBeenCalledWith(false, true, 'a', 10, 10);
      });

      it('should call tooltip toggle on mouseleave', () => {
        text.simulate('mouseleave', { });
        expect(toggleTooltip).toHaveBeenCalledWith(false, false, 'a');
      });
    });
  });

  describe('without reference', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Columns
          cellSize={15}
          fontSize={12}
          handleClick={handleClick}
          names={[
            { original: 'a', text: 'a', trimmed: false },
            { original: 'b', text: 'b', trimmed: false },
            { original: 'c', text: 'c', trimmed: false },
          ]}
          openContextMenu={openContextMenu}
          search={{
            columns: {},
            match: false,
            term: null,
          }}
          toggleTooltip={toggleTooltip}
        />,
      );
    });

    it('should render and match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render rect elements', () => {
      expect(wrapper.find('rect').length).toBe(0);
    });
  });

  describe('with search', () => {
    it('should not create a rect when there is no search term', () => {
      const wrapper = shallow(
        <Columns
          cellSize={15}
          fontSize={12}
          handleClick={handleClick}
          names={[
            { original: 'a', text: 'a', trimmed: false },
            { original: 'b', text: 'b', trimmed: false },
            { original: 'c', text: 'c', trimmed: false },
          ]}
          openContextMenu={openContextMenu}
          search={{
            columns: { c: true },
            match: true,
            term: null,
          }}
          toggleTooltip={toggleTooltip}
        />,
      );
      expect(wrapper.find('rect').length).toBe(0);
    });

    it('should not create a rect when there is no match to the search term', () => {
      const wrapper = shallow(
        <Columns
          cellSize={15}
          fontSize={12}
          handleClick={handleClick}
          names={[
            { original: 'a', text: 'a', trimmed: false },
            { original: 'b', text: 'b', trimmed: false },
            { original: 'c', text: 'c', trimmed: false },
          ]}
          openContextMenu={openContextMenu}
          search={{
            columns: { c: true },
            match: false,
            term: 'b',
          }}
          toggleTooltip={toggleTooltip}
        />,
      );
      expect(wrapper.find('rect').length).toBe(0);
    });

    it('should not create a rect when the text element does not match the search term', () => {
      const wrapper = shallow(
        <Columns
          cellSize={15}
          fontSize={12}
          handleClick={handleClick}
          names={[
            { original: 'a', text: 'a', trimmed: false },
            { original: 'b', text: 'b', trimmed: false },
            { original: 'c', text: 'c', trimmed: false },
          ]}
          openContextMenu={openContextMenu}
          search={{
            columns: { b: true },
            match: true,
            term: 'b',
          }}
          toggleTooltip={toggleTooltip}
        />,
      );
      expect(wrapper.findWhere(node => node.key() === 'c-match').length).toBe(0);
    });
  });
});
