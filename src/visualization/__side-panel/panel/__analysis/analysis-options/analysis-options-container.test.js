import React from 'react';
import { shallow } from 'enzyme';

import { AnalysisOptionsContainer } from './analysis-options-container';

const setAnalysisType = jest.fn();

describe('Analysis options panel container', () => {
  let wrapper;

  beforeEach(() => {
    setAnalysisType.mockClear();
  });

  beforeAll(() => {
    wrapper = shallow(
      <AnalysisOptionsContainer
        performVizAnalysis={jest.fn()}
        setAnalysisType={setAnalysisType}
      />,
    );
  });

  it('should call prop method to handle type change', () => {
    wrapper.instance().handleType('go');
    expect(setAnalysisType).toHaveBeenCalledWith('go');
  });
});
