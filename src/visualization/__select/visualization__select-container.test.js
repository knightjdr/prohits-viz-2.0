import React from 'react';
import { shallow } from 'enzyme';

import ValidateJson from './visualization__select-validate';
import { SelectContainer } from './visualization__select-container';

// Mock validation.
jest.mock('./visualization__select-validate');

const testFile = { fileList: [{ originFileObj: new File([''], 'samplefile.txt', { type: 'text/plain' }) }] };

const parseFile = jest.fn();

describe('SelectContainer', () => {
  beforeEach(() => {
    /* Clear call count */
    parseFile.mockClear();
  });

  test('Initial empty state', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: null }}
        parseFile={parseFile}
      />,
    );
    expect(wrapper.state().err).toBeNull();
    expect(wrapper.state().vizType).toBeNull();
  });

  test('Initial state with a params in redux store', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: 'heatmap' }}
        parseFile={parseFile}
      />,
    );
    expect(wrapper.state().err).toBeNull();
    expect(wrapper.state().vizType).toBe('heatmap');
  });

  test('Changing params image type prop sets viz type', () => {
    const wrapper = shallow(
      <SelectContainer
        params={{ imageType: null }}
        parseFile={parseFile}
      />,
    );
    jest.clearAllMocks();
    wrapper.setProps({ params: { imageType: 'scatter' } });
    expect(wrapper.state().vizType).toBe('scatter');
  });

  test('File loaded and validated', () => {
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
    expect(parseFile).toHaveBeenCalledTimes(0);
    expect(wrapper.state().err).toBe('Test error');

    // Succesful file reading and validation.
    ValidateJson.mockReturnValue({ err: null, json: {} });
    onFileLoad('test');
    expect(parseFile).toHaveBeenCalledTimes(1);
    expect(wrapper.state().err).toBeNull();

    // Restore mock.
    ValidateJson.mockRestore();
  });

  test('HandleFile handles null input file', () => {
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
      expect(wrapper.state().err).toBeNull();
    });
  });

  test('HandleFile handles input file', () => {
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
