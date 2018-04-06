import React from 'react';
import { shallow } from 'enzyme';

import ArrayShallowEqual from '../../../helpers/array-shallow-equal';
import DefineColumns from './define-columns';
import { HeaderSelectionContainer } from './header-selection-container';

jest.mock('../../../helpers/array-shallow-equal');
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

  test('Store updated via setInitialReduxFormState', () => {
    const wrapper = shallow(
      <HeaderSelectionContainer
        change={change}
        form={form.unset}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, form.unset, columns);
    expect(change).toHaveBeenCalledTimes(4);
    expect(change).toHaveBeenCalledWith('abundance', columns.abundance.initialValue);
    expect(change).toHaveBeenCalledWith('bait', columns.bait.initialValue);
    expect(change).toHaveBeenCalledWith('prey', columns.prey.initialValue);
    expect(change).toHaveBeenCalledWith('score', columns.score.initialValue);
  });

  test('Store not updated via setInitialReduxFormState when form is already set', () => {
    const wrapper = shallow(
      <HeaderSelectionContainer
        change={change}
        form={form.unset}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, form.set, columns);
    expect(change).not.toHaveBeenCalled();
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
    wrapper.instance().setReduxFormState(change, columns);
    expect(change).toHaveBeenCalledTimes(4);
    expect(change).toHaveBeenCalledWith('abundance', columns.abundance.initialValue);
    expect(change).toHaveBeenCalledWith('bait', columns.bait.initialValue);
    expect(change).toHaveBeenCalledWith('prey', columns.prey.initialValue);
    expect(change).toHaveBeenCalledWith('score', columns.score.initialValue);
  });

  test('Store not updated via setReduxFormState when columns have no initial values', () => {
    const wrapper = shallow(
      <HeaderSelectionContainer
        change={change}
        form={form.unset}
        header={header}
      />,
    );
    jest.clearAllMocks();
    const columnsEmpty = {
      abundance: {},
      bait: {},
      prey: {},
      score: {},
    };
    wrapper.instance().setReduxFormState(change, columnsEmpty);
    expect(change).not.toHaveBeenCalled();
  });

  test('Header change via props triggers state change', () => {
    ArrayShallowEqual.mockReturnValueOnce(false);
    const headerNew = ['column1', 'column3'];
    const wrapper = shallow(
      <HeaderSelectionContainer
        change={change}
        form={form.unset}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState = jest.fn();
    wrapper.update();
    wrapper.setProps({
      change,
      form: form.unset,
      header: headerNew,
    });
    expect(DefineColumns).toHaveBeenCalledWith('dotplot', 'saint', headerNew);
    expect(wrapper.instance().setReduxFormState).toHaveBeenCalledTimes(1);
    expect(wrapper.state().columns).toEqual(columns);
  });

  test('AnalysisType change via form props triggers state change', () => {
    const wrapper = shallow(
      <HeaderSelectionContainer
        change={change}
        form={form.unset}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState = jest.fn();
    wrapper.update();
    wrapper.setProps({
      change,
      form: {
        analysisType: 'correlation',
        fileType: 'saint',
      },
      header,
    });
    expect(DefineColumns).toHaveBeenCalledWith('correlation', 'saint', header);
    expect(wrapper.instance().setReduxFormState).toHaveBeenCalledTimes(1);
    expect(wrapper.state().columns).toEqual(columns);
  });

  test('Header and AnalysisType do not change via then nothing happens', () => {
    ArrayShallowEqual.mockReturnValueOnce(true);
    const wrapper = shallow(
      <HeaderSelectionContainer
        change={change}
        form={form.unset}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState = jest.fn();
    wrapper.update();
    wrapper.setProps({
      change,
      form: form.unset,
      header,
    });
    expect(DefineColumns).not.toHaveBeenCalled();
    expect(wrapper.instance().setReduxFormState).not.toHaveBeenCalled();
  });
});
