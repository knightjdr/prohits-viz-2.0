import React from 'react';
import { shallow } from 'enzyme';

import { ContextMenu } from './context-menu';

const copyAll = jest.fn();
const copySelected = jest.fn();
const toggleModal = jest.fn();

beforeEach(() => {
  copyAll.mockClear();
  copySelected.mockClear();
  toggleModal.mockClear();
});

describe('Context menu', () => {
  describe('when rendering without paste ability', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ContextMenu
          canPaste={false}
          copyAll={copyAll}
          copySelected={copySelected}
          left={0}
          show
          toggleModal={toggleModal}
          top={0}
        />,
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render paste options', () => {
      expect(wrapper.find('button').length).toBe(2);
    });

    it('should call copy selected prop method on button click', () => {
      wrapper.find('button').at(0).simulate('click');
      expect(copySelected).toHaveBeenCalledTimes(1);
    });

    it('should call copy all prop method on button click', () => {
      wrapper.find('button').at(1).simulate('click');
      expect(copyAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('when rendering with paste ability', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <ContextMenu
          canPaste
          copyAll={copyAll}
          copySelected={copySelected}
          left={0}
          show
          toggleModal={toggleModal}
          top={0}
        />,
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render paste options', () => {
      expect(wrapper.find('button').length).toBe(4);
    });

    it('should call toggle moddle prop method with "pasteAppend" on button click', () => {
      wrapper.find('button').at(2).simulate('click');
      expect(toggleModal).toHaveBeenCalledWith('pasteAppend');
    });

    it('should call toggle moddle prop method with "pasteReplace" on button click', () => {
      wrapper.find('button').at(3).simulate('click');
      expect(toggleModal).toHaveBeenCalledWith('pasteReplace');
    });
  });
});
