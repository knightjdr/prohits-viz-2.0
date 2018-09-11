import React from 'react';
import { shallow } from 'enzyme';

import { AnalysisOptionsContainer } from './analysis-options-container';

const customizeImage = jest.fn();
const performVizAnalysis = jest.fn();
const setAnalysisType = jest.fn();

describe('Analysis options panel container', () => {
  let wrapper;

  beforeEach(() => {
    customizeImage.mockClear();
    performVizAnalysis.mockClear();
    setAnalysisType.mockClear();
  });

  beforeAll(() => {
    wrapper = shallow(
      <AnalysisOptionsContainer
        customizeSelection={customizeImage}
        performAnalysis={performVizAnalysis}
        setAnalysisType={setAnalysisType}
      />,
    );
  });

  it('should call prop method to handle type change', () => {
    wrapper.instance().handleType('go');
    expect(setAnalysisType).toHaveBeenCalledWith('go');
  });

  describe('call correct prop method based on analysis type', () => {
    it('should not call a method when type is undefined', () => {
      wrapper.instance().performAnalysis();
      expect(customizeImage).not.toHaveBeenCalled();
      expect(performVizAnalysis).not.toHaveBeenCalled();
    });

    it('should call a customize method when type is customize', () => {
      wrapper.setProps({ analysis: 'customize' });
      wrapper.instance().performAnalysis();
      expect(customizeImage).toHaveBeenCalled();
      expect(performVizAnalysis).not.toHaveBeenCalled();
    });

    it('should call a performAnalysis method when type is defined but != customize', () => {
      wrapper.setProps({ analysis: 'go' });
      wrapper.instance().performAnalysis();
      expect(customizeImage).not.toHaveBeenCalled();
      expect(performVizAnalysis).toHaveBeenCalled();
    });
  });
});
