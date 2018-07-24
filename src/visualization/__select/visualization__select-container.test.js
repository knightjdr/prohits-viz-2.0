import React from 'react';
import { shallow } from 'enzyme';

import FillJson from './fill/fill';
import ValidateJson from './visualization__select-validate';
import { SelectContainer } from './visualization__select-container';

// Mock validation.
jest.mock('./visualization__select-validate');
jest.mock('./fill/fill');

const testFile = { fileList: [{ originFileObj: new File([''], 'samplefile.txt', { type: 'text/plain' }) }] };

const parseFile = jest.fn();

describe('Interactive file select container', () => {
  beforeEach(() => {
    /* Clear call count */
    parseFile.mockClear();
  });

  test('should have empty initial state', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: null }}
        parseFile={parseFile}
      />,
    );
    expect(wrapper.state().err).toBeNull();
    expect(wrapper.state().loading).toBeFalsy();
    expect(wrapper.state().vizType).toBeNull();
  });

  test('should load state via redux params', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: 'heatmap' }}
        parseFile={parseFile}
      />,
    );
    expect(wrapper.state('err')).toBeNull();
    expect(wrapper.state('loading')).toBeFalsy();
    expect(wrapper.state('vizType')).toBe('heatmap');
  });

  test('should change viz type via prop', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: null }}
        parseFile={parseFile}
      />,
    );
    jest.clearAllMocks();
    wrapper.setProps({ params: { imageType: 'scatter' } });
    expect(wrapper.state('vizType')).toBe('scatter');
  });

  test('should not change viz type via prop', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: 'heatmap' }}
        parseFile={parseFile}
      />,
    );
    jest.clearAllMocks();

    const spy = jest.spyOn(wrapper.instance(), 'changeVizType');
    wrapper.setProps({ params: { imageType: 'heatmap' } });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  test('should change viz type via changeVizType', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: null }}
        parseFile={parseFile}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().changeVizType('scatter');
    expect(wrapper.state('vizType')).toBe('scatter');
  });

  test('should validate and load file via onFileLoad', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: null }}
        parseFile={parseFile}
      />,
    );
    jest.clearAllMocks();
    const { onFileLoad } = wrapper.instance();

    // Error with file validation.
    ValidateJson.mockReturnValue({ err: true, message: 'Test error' });
    onFileLoad('test');
    expect(FillJson).toHaveBeenCalledTimes(0);
    expect(parseFile).toHaveBeenCalledTimes(0);
    expect(wrapper.state('err')).toBe('Test error');
    expect(wrapper.state('loading')).toBeFalsy();

    // Succesful file reading and validation.
    ValidateJson.mockReturnValue({ err: null, json: {} });
    onFileLoad('test');
    expect(FillJson).toHaveBeenCalledTimes(1);
    expect(parseFile).toHaveBeenCalledTimes(1);
    expect(wrapper.state('err')).toBeNull();
    expect(wrapper.state('loading')).toBeFalsy();

    // Restore mock.
    ValidateJson.mockRestore();
  });

  test('should handle null input file', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: null }}
        parseFile={parseFile}
      />,
    );
    jest.clearAllMocks();
    const loadSpy = jest.spyOn(wrapper.instance(), 'onFileLoad');

    // Set err state to test for clearing err.
    wrapper.setState({ err: 'Test error' });
    const { handleFile } = wrapper.instance();
    return handleFile().then(() => {
      expect(loadSpy).toHaveBeenCalledTimes(0);
      expect(wrapper.state('err')).toBeNull();
      expect(wrapper.state('loading')).toBeFalsy();
    });
  });

  test('should handle input file', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: null }}
        parseFile={parseFile}
      />,
    );
    jest.clearAllMocks();
    const loadSpy = jest.spyOn(wrapper.instance(), 'onFileLoad');

    // Set err state to test for clearing err.
    wrapper.setState({ err: 'Test error' });
    const { handleFile } = wrapper.instance();
    return handleFile(testFile).then(() => {
      expect(loadSpy).toHaveBeenCalledTimes(1);
    });
  });
});
