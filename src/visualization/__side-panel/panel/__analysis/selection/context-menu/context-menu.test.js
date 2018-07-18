import React from 'react';
import { shallow } from 'enzyme';

import ContextMenu from './context-menu';

const closeMenu = jest.fn();
const copyAll = jest.fn();
const copySelected = jest.fn();
const toggleModal = jest.fn();

describe('Context menu', () => {
  beforeEach(() => {
    /* Clear call count */
    closeMenu.mockClear();
    copyAll.mockClear();
    copySelected.mockClear();
    toggleModal.mockClear();
  });

  it('should not display when "show" is false', () => {
    const wrapper = shallow(
      <ContextMenu
        canPaste={false}
        closeMenu={closeMenu}
        copyAll={copyAll}
        copySelected={copySelected}
        left={0}
        show={false}
        toggleModal={toggleModal}
        top={0}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    const contextDiv = wrapper.find('.context-menu');
    expect(contextDiv.get(0).props.style.opacity).toBe(0);
    expect(contextDiv.get(0).props.style.visibility).toBe('hidden');
  });

  it('should display when "show" is true', () => {
    const wrapper = shallow(
      <ContextMenu
        canPaste={false}
        closeMenu={closeMenu}
        copyAll={copyAll}
        copySelected={copySelected}
        left={0}
        show
        toggleModal={toggleModal}
        top={0}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    const contextDiv = wrapper.find('.context-menu');
    expect(contextDiv.get(0).props.style.opacity).toBe(1);
    expect(contextDiv.get(0).props.style.visibility).toBe('visible');
  });

  it('should not display render paste options when "canPaste" is false', () => {
    const wrapper = shallow(
      <ContextMenu
        canPaste={false}
        closeMenu={closeMenu}
        copyAll={copyAll}
        copySelected={copySelected}
        left={0}
        show
        toggleModal={toggleModal}
        top={0}
      />,
    );
    expect(wrapper.find('button').length).toBe(2);
  });

  it('should display render paste options when "canPaste" is true', () => {
    const wrapper = shallow(
      <ContextMenu
        canPaste
        closeMenu={closeMenu}
        copyAll={copyAll}
        copySelected={copySelected}
        left={0}
        show
        toggleModal={toggleModal}
        top={0}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button').length).toBe(4);
  });

  it('should call copy selected prop method on button click', () => {
    const wrapper = shallow(
      <ContextMenu
        canPaste
        closeMenu={closeMenu}
        copyAll={copyAll}
        copySelected={copySelected}
        left={0}
        show
        toggleModal={toggleModal}
        top={0}
      />,
    );
    wrapper.find('button').at(0).simulate('click');
    expect(copySelected).toHaveBeenCalledTimes(1);
  });

  it('should call copy all prop method on button click', () => {
    const wrapper = shallow(
      <ContextMenu
        canPaste
        closeMenu={closeMenu}
        copyAll={copyAll}
        copySelected={copySelected}
        left={0}
        show
        toggleModal={toggleModal}
        top={0}
      />,
    );
    wrapper.find('button').at(1).simulate('click');
    expect(copyAll).toHaveBeenCalledTimes(1);
  });

  it('should call toggle moddle prop method with "pasteAppend" on button click', () => {
    const wrapper = shallow(
      <ContextMenu
        canPaste
        closeMenu={closeMenu}
        copyAll={copyAll}
        copySelected={copySelected}
        left={0}
        show
        toggleModal={toggleModal}
        top={0}
      />,
    );
    wrapper.find('button').at(2).simulate('click');
    expect(toggleModal).toHaveBeenCalledWith('pasteAppend');
  });

  it('should call toggle moddle prop method with "pasteReplace" on button click', () => {
    const wrapper = shallow(
      <ContextMenu
        canPaste
        closeMenu={closeMenu}
        copyAll={copyAll}
        copySelected={copySelected}
        left={0}
        show
        toggleModal={toggleModal}
        top={0}
      />,
    );
    wrapper.find('button').at(3).simulate('click');
    expect(toggleModal).toHaveBeenCalledWith('pasteReplace');
  });
});
