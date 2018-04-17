import React from 'react';
import { shallow } from 'enzyme';

import ScoreTypeContainer, { expectedScoreDir } from './score-type-container';

const change = jest.fn();

describe('ScoreTypeContainer', () => {
  test('expectedScoreDir returns assigned value when score type is known', () => {
    expect(expectedScoreDir('avgp')).toBe('gte');
  });

  test('expectedScoreDir ignores score case', () => {
    expect(expectedScoreDir('AVGP')).toBe('gte');
  });

  test('expectedScoreDir returns "lte" when score type is unknown', () => {
    expect(expectedScoreDir('test')).toBe('lte');
  });

  test('Store updated on mount', () => {
    jest.clearAllMocks();
    shallow(
      <ScoreTypeContainer
        analysisType="dotplot"
        change={change}
        score="bfdr"
        scoreType={undefined}
      />,
    );
    expect(change).toHaveBeenCalledWith('scoreType', 'lte');
  });

  test('Store updated when type is not set', () => {
    const wrapper = shallow(
      <ScoreTypeContainer
        analysisType="dotplot"
        change={change}
        score="bfdr"
        scoreType={undefined}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, 'bfdr', undefined);
    expect(change).toHaveBeenCalledWith('scoreType', 'lte');
  });

  test('Store not updated when type is set', () => {
    const wrapper = shallow(
      <ScoreTypeContainer
        analysisType="dotplot"
        change={change}
        score="bfdr"
        scoreType="lte"
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, 'bfdr', 'lte');
    expect(change).not.toHaveBeenCalled();
  });

  test('Store not updated when score column is not set', () => {
    const wrapper = shallow(
      <ScoreTypeContainer
        analysisType="dotplot"
        change={change}
        score={undefined}
        scoreType={undefined}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, undefined, undefined);
    expect(change).not.toHaveBeenCalled();
  });

  test('When score column changes via props, store updates', () => {
    const wrapper = shallow(
      <ScoreTypeContainer
        analysisType="dotplot"
        change={change}
        score="bfdr"
        scoreType={undefined}
      />,
    );
    jest.clearAllMocks();
    wrapper.setProps({ score: 'avgp' });
    expect(change).toHaveBeenCalledWith('scoreType', 'gte');
  });

  test('When score column does not change via props, store does not change', () => {
    const wrapper = shallow(
      <ScoreTypeContainer
        analysisType="dotplot"
        change={change}
        score="bfdr"
        scoreType={undefined}
      />,
    );
    jest.clearAllMocks();
    wrapper.setProps({ score: 'bfdr' });
    expect(change).not.toHaveBeenCalled();
  });
});
