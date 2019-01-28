import React from 'react';
import { shallow } from 'enzyme';

import Files from './task__files';

const changeFile = jest.fn();
const downloadFolder = jest.fn();
const viewFile = jest.fn();

describe('Task files', () => {
  describe('with no files', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Files
          changeFile={changeFile}
          downloadFolder={downloadFolder}
          id="task1"
          viewFile={viewFile}
        />,
      );
    });

    it('should return null', () => {
      expect(wrapper.getElement()).toBeNull();
    });
  });

  describe('with files', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Files
          changeFile={changeFile}
          downloadFolder={downloadFolder}
          files={['log.txt', 'dotplot.json']}
          id="task1"
          primaryFile="dotplot.json"
          viewFile={viewFile}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should set default value for file', () => {
      expect(wrapper.find('Select').props().defaultValue).toBe('dotplot.json');
    });

    it('should call change file', () => {
      changeFile.mockClear();
      wrapper.find('Select').simulate('change', 'log.txt');
      expect(changeFile).toHaveBeenCalledWith('task1', 'log.txt');
    });

    it('should have option for log file', () => {
      const option = wrapper.find('Option').first();
      expect(option.props().children).toBe('log.txt');
    });

    it('should have option for dotplot file', () => {
      const option = wrapper.find('Option').at(1);
      expect(option.props().children).toBe('dotplot.json');
    });

    it('should call view file', () => {
      viewFile.mockClear();
      wrapper.find('Button').first().simulate('click');
      expect(viewFile).toHaveBeenCalledWith('task1');
    });

    it('should call download folder', () => {
      downloadFolder.mockClear();
      wrapper.find('Button').at(1).simulate('click');
      expect(downloadFolder).toHaveBeenCalledWith('task1');
    });
  });
});
