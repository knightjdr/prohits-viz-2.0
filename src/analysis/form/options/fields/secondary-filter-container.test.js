import React from 'react';
import { shallow } from 'enzyme';

import DefaultScore from './field-funcs/default-secondary-filter';
import SecondaryFilterContainer from './secondary-filter-container';

jest.mock('./field-funcs/default-secondary-filter');
DefaultScore.mockReturnValue(0.05);

const change = jest.fn();

describe('SecondaryFilterContainer', () => {
  test('Check if score value should change when props change', () => {
    const wrapper = shallow(
      <SecondaryFilterContainer
        analysisType="dotplot"
        change={change}
        score="bfdr"
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState = jest.fn();
    wrapper.update();
    wrapper.setProps({});
    expect(wrapper.instance().setReduxFormState).toHaveBeenCalledTimes(1);
    wrapper.instance().setReduxFormState.mockRestore();
  });

  test('Change score when analysisType changes', () => {
    const wrapper = shallow(
      <SecondaryFilterContainer
        analysisType="dotplot"
        change={change}
        score="bfdr"
      />,
    );
    jest.clearAllMocks();
    wrapper.setProps({ analysisType: 'correlation' });
    expect(change).toHaveBeenCalledWith('secondaryFilter', 0.05);
  });

  test('Change score when score column changes', () => {
    const wrapper = shallow(
      <SecondaryFilterContainer
        analysisType="dotplot"
        change={change}
        score="bfdr"
      />,
    );
    jest.clearAllMocks();
    wrapper.setProps({ score: 'avgp' });
    expect(change).toHaveBeenCalledWith('secondaryFilter', 0.05);
  });

  test('Do not change score when props do not change', () => {
    const wrapper = shallow(
      <SecondaryFilterContainer
        analysisType="dotplot"
        change={change}
        score="bfdr"
      />,
    );
    jest.clearAllMocks();
    wrapper.setProps({ analysisType: 'dotplot', score: 'bfdr' });
    expect(change).toHaveBeenCalledTimes(0);
  });
});
