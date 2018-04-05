import React from 'react';
import { shallow } from 'enzyme';

import DefineColumns from './define-columns';
import { HeaderSelectionContainer } from './header-selection-container';

jest.mock('./define-columns');

const change = jest.fn();
const columns = {
  abundance: { initialValue: 'test' },
  bait: { initialValue: 'test' },
  prey: { initialValue: 'test' },
  score: { initialValue: 'test' },
};
const form = {
  set: {
    abundance: 'abundance',
    analysisType: 'dotplot',
    bait: 'bait',
    fileType: 'saint',
    prey: 'prey',
    score: 'score',
  },
  unset: {
    analysisType: 'dotplot',
    fileType: 'saint',
  },
};
const header = ['column1', 'column2'];

DefineColumns.mockReturnValue(columns);

describe('NewsListContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders initially', () => {
    const wrapper = shallow(
      <HeaderSelectionContainer
        change={change}
        form={form.unset}
        header={header}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Columns defined and store state set on mount', () => {
    const wrapper = shallow(
      <HeaderSelectionContainer
        change={change}
        form={form.unset}
        header={header}
      />,
    );
    expect(DefineColumns).toHaveBeenCalledWith('dotplot', 'saint', header);
    expect(change).toHaveBeenCalledTimes(4);
    expect(wrapper.state().columns).toEqual(columns);
  });

  test('Store updated via setReduxFormState', () => {
    const wrapper = shallow(
      <HeaderSelectionContainer
        change={change}
        form={form.unset}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, form.unset, columns);
    expect(change).toHaveBeenCalledTimes(4);
    expect(change).toHaveBeenCalledWith('abundance', columns.abundance.initialValue);
    expect(change).toHaveBeenCalledWith('bait', columns.bait.initialValue);
    expect(change).toHaveBeenCalledWith('prey', columns.prey.initialValue);
    expect(change).toHaveBeenCalledWith('score', columns.score.initialValue);
  });

  test('Store updated via setReduxFormState', () => {
    const wrapper = shallow(
      <HeaderSelectionContainer
        change={change}
        form={form.unset}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, form.set, columns);
    expect(change).not.toHaveBeenCalled();
  });
});
