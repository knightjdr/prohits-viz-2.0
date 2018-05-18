import React from 'react';
import { shallow } from 'enzyme';

import ValidateJson from './validate-json';
import { SelectVizTypeContainer } from './select-viz-type-container';

const setFile = jest.fn();

// Mock validation.
jest.mock('./validate-json');

const testFile = { fileList: [new File([''], 'samplefile.txt', { type: 'text/plain' })] };
const testJson = {
  params: {
    imageType: 'heatmap',
  },
};

describe('SelectVizTypeContainer', () => {
  test('Initial empty state', () => {
    const wrapper = shallow(
      <SelectVizTypeContainer
        setFile={setFile}
      />,
    );
    expect(wrapper.state().err).toBeNull();
    expect(wrapper.state().vizType).toBeNull();
  });

  test('Initial state with a json file in redux store', () => {
    const wrapper = shallow(
      <SelectVizTypeContainer
        interactiveFile={testJson}
        setFile={setFile}
      />,
    );
    expect(wrapper.state().err).toBeNull();
    expect(wrapper.state().vizType).toBe('heatmap');
  });

  test('Changing json file prop sets viz type', () => {
    const wrapper = shallow(
      <SelectVizTypeContainer
        setFile={setFile}
      />,
    );
    jest.clearAllMocks();
    const vizSpy = jest.spyOn(wrapper.instance(), 'setVizType');

    wrapper.setProps({ interactiveFile: { params: { imageType: 'scatter' } } });
    expect(vizSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().vizType).toBe('scatter');
  });

  test('Null interactive file prop change does nothing', () => {
    const wrapper = shallow(
      <SelectVizTypeContainer
        setFile={setFile}
      />,
    );
    jest.clearAllMocks();
    const vizSpy = jest.spyOn(wrapper.instance(), 'setVizType');

    wrapper.setProps({ interactiveFile: null });
    expect(vizSpy).toHaveBeenCalledTimes(0);
  });

  test('File loaded and validation', () => {
    const wrapper = shallow(
      <SelectVizTypeContainer
        setFile={setFile}
      />,
    );
    jest.clearAllMocks();
    const { onFileLoad } = wrapper.instance();

    // Error with file validation.
    ValidateJson.mockReturnValue({ err: true, message: 'Test error' });
    onFileLoad('test');
    expect(setFile).toHaveBeenCalledTimes(0);
    expect(wrapper.state().err).toBe('Test error');

    // Succesful file reading and validation.
    ValidateJson.mockReturnValue({ err: null, json: {} });
    onFileLoad('test');
    expect(setFile).toHaveBeenCalledTimes(1);
    expect(wrapper.state().err).toBeNull();

    // Restore mock.
    ValidateJson.mockRestore();
  });

  test('Set vizType based on json file imageType property', () => {
    const wrapper = shallow(
      <SelectVizTypeContainer
        setFile={setFile}
      />,
    );
    const { setVizType } = wrapper.instance();
    expect(setVizType()).toBeNull();
    expect(setVizType(testJson)).toBe('heatmap');
    expect(setVizType({ params: { imageType: 'dotplot' } })).toBe('heatmap');
    expect(setVizType({ params: { imageType: 'scatter' } })).toBe('scatter');
    expect(setVizType({ params: { imageType: 'unknown' } })).toBeNull();
  });

  test('HandleFile handles null input file', () => {
    const wrapper = shallow(
      <SelectVizTypeContainer
        setFile={setFile}
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
      <SelectVizTypeContainer
        setFile={setFile}
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
