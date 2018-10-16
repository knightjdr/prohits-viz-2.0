import React from 'react';
import { shallow } from 'enzyme';

import FillJson from '../fill/fill';
import ValidateJson from './visualization__select-validate';
import { SelectContainer } from './visualization__select-container';

// Mock validation.
jest.mock('./visualization__select-type');
jest.mock('./visualization__select-validate');
jest.mock('../fill/fill');

const testFile = { fileList: [{ originFileObj: new File([''], 'samplefile.txt', { type: 'text/plain' }) }] };

const parseFile = jest.fn();

describe('Interactive file select container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <SelectContainer
        imageType={null}
        parseFile={parseFile}
      />,
    );
  });

  it('should have empty initial state', () => {
    expect(wrapper.state().err).toBeNull();
    expect(wrapper.state().loading).toBeFalsy();
    expect(wrapper.state().vizType).toBeNull();
  });

  it('should change viz type via changeVizType', () => {
    wrapper.setState({ vizType: null });
    wrapper.instance().changeVizType('scatter');
    expect(wrapper.state('vizType')).toBe('scatter');
  });

  it('should change viz type via prop', () => {
    const testWrapper = shallow(
      <SelectContainer
        imageType={null}
        parseFile={parseFile}
      />,
    );
    testWrapper.setProps({ imageType: 'scatter' });
    expect(testWrapper.state('vizType')).toBe('scatter');
  });

  it('should not change viz type via prop', () => {
    const testWrapper = shallow(
      <SelectContainer
        imageType="heatmap"
        parseFile={parseFile}
      />,
    );
    const spy = jest.spyOn(testWrapper.instance(), 'changeVizType');
    testWrapper.update();
    testWrapper.setProps({ imageType: 'heatmap' });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  describe('when loading a file', () => {
    describe('should validate and load file via onFileLoad', () => {
      describe('with an error', () => {
        beforeAll(() => {
          ValidateJson.mockReturnValue({ err: true, message: 'Test error' });
          wrapper.instance().onFileLoad('test');
        });

        afterAll(() => {
          ValidateJson.mockRestore();
        });

        it('should not call fill json', () => {
          expect(FillJson).toHaveBeenCalledTimes(0);
        });

        it('should not call parse file', () => {
          expect(parseFile).toHaveBeenCalledTimes(0);
        });

        it('should report error', () => {
          expect(wrapper.state('err')).toBe('Test error');
        });

        it('should set loading state to false', () => {
          expect(wrapper.state('loading')).toBeFalsy();
        });
      });

      describe('on success', () => {
        beforeAll(() => {
          ValidateJson.mockReturnValue({ err: null, json: {} });
          wrapper.instance().onFileLoad('test');
        });

        afterAll(() => {
          ValidateJson.mockRestore();
        });

        it('should call fill json', () => {
          expect(FillJson).toHaveBeenCalledTimes(1);
        });

        it('should call parse file', () => {
          expect(parseFile).toHaveBeenCalledTimes(1);
        });

        it('should not report error', () => {
          expect(wrapper.state('err')).toBeNull();
        });

        it('should set loading state to false', () => {
          expect(wrapper.state('loading')).toBeFalsy();
        });
      });
    });

    it('should handle null input file', () => {
      const loadSpy = jest.spyOn(wrapper.instance(), 'onFileLoad');
      wrapper.update();

      // Set err state to test for clearing err.
      wrapper.setState({ err: 'Test error' });
      const { handleFile } = wrapper.instance();
      return handleFile().then(() => {
        expect(loadSpy).not.toHaveBeenCalled();
        expect(wrapper.state('err')).toBeNull();
        expect(wrapper.state('loading')).toBeFalsy();
        loadSpy.mockRestore();
      });
    });

    test('should handle input file', () => {
      const loadSpy = jest.spyOn(wrapper.instance(), 'onFileLoad');
      wrapper.update();

      // Set err state to test for clearing err.
      wrapper.setState({ err: 'Test error' });
      const { handleFile } = wrapper.instance();
      return handleFile(testFile).then(() => {
        expect(loadSpy).toHaveBeenCalledTimes(1);
        loadSpy.mockRestore();
      });
    });
  });
});
