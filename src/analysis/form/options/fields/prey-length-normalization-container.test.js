import React from 'react';
import { shallow } from 'enzyme';

import { arrayShallowEqual } from '../../../../helpers/array-shallow-equal';
import PreyLengthNormalizationContainer from './prey-length-normalization-container';
import FilterHeader from '../../header-selection/filter-header';

jest.mock('../../../../helpers/array-shallow-equal');

// mock filter-header
jest.mock('../../header-selection/filter-header');
const options = [
  { text: 'column1', value: 'column1' },
  { text: 'column2', value: 'column2' },
];

const change = jest.fn();
const header = ['column1', 'column2'];

describe('PreyLengthNormalizationContainer', () => {
  test('Store set on mount', () => {
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options,
    });
    const wrapper = shallow(
      <PreyLengthNormalizationContainer
        analysisType="dotplot"
        change={change}
        preyLengthNorm={false}
        preyLength={undefined}
        header={header}
      />,
    );
    expect(FilterHeader).toHaveBeenCalledTimes(1);
    expect(wrapper.state().options).toEqual(options);
    expect(change).toHaveBeenCalledTimes(2);
    FilterHeader.mockRestore();
  });

  test(`Store not updated by default via setInitialReduxFormState when preyLengthNorm
    is false`, () => {
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <PreyLengthNormalizationContainer
        analysisType="dotplot"
        change={change}
        preyLengthNorm={false}
        preyLength={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, undefined, false, header);
    expect(FilterHeader).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('preyLengthNorm', false);
    expect(change).toHaveBeenCalledWith('preyLength', 'column1');
    FilterHeader.mockRestore();
  });

  test(`Store updated via setInitialReduxFormState when preyLengthNorm is true
    and can be set`, () => {
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <PreyLengthNormalizationContainer
        analysisType="dotplot"
        change={change}
        preyLengthNorm
        preyLength={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, undefined, true, header);
    expect(FilterHeader).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('preyLengthNorm', true);
    expect(change).toHaveBeenCalledWith('preyLength', 'column1');
    FilterHeader.mockRestore();
  });

  test(`Store not updated via setInitialReduxFormState when preyLengthNorm is true
    and cannot be set`, () => {
    FilterHeader.mockReturnValue({
      initialValue: null,
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <PreyLengthNormalizationContainer
        analysisType="dotplot"
        change={change}
        preyLengthNorm
        preyLength={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, undefined, true, header);
    expect(FilterHeader).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith('preyLengthNorm', false);
    FilterHeader.mockRestore();
  });

  test(`Store column not updated via setInitialReduxFormState when preyLengthNorm is true
    and column is already set`, () => {
    FilterHeader.mockReturnValue({
      initialValue: null,
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <PreyLengthNormalizationContainer
        analysisType="dotplot"
        change={change}
        preyLengthNorm
        preyLength="test"
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, 'test', true, header);
    expect(FilterHeader).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith('preyLengthNorm', true);
    FilterHeader.mockRestore();
  });

  test('Check header when props change', () => {
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <PreyLengthNormalizationContainer
        analysisType="dotplot"
        change={change}
        preyLengthNorm
        preyLength={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState = jest.fn();
    wrapper.update();
    wrapper.setProps({});
    expect(wrapper.instance().setReduxFormState).toHaveBeenCalledTimes(1);
    wrapper.instance().setReduxFormState.mockRestore();
  });

  test('Store column updated when header changes', () => {
    const headerNew = ['column1', 'column2', 'column3'];
    const optionsNew = [
      { text: 'column1', value: 'column1' },
      { text: 'column2', value: 'column2' },
      { text: 'column3', value: 'column3' },
    ];
    arrayShallowEqual.mockReturnValue(false);
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options: optionsNew,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <PreyLengthNormalizationContainer
        analysisType="dotplot"
        change={change}
        preyLengthNorm={false}
        preyLength={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, headerNew);
    expect(FilterHeader).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith('preyLength', 'column1');
    expect(wrapper.state().options).toEqual(optionsNew);
    arrayShallowEqual.mockRestore();
    FilterHeader.mockRestore();
  });

  test('Store not updated when header changes and no recommended column', () => {
    const headerNew = ['column1', 'column2', 'column3'];
    const optionsNew = [
      { text: 'column1', value: 'column1' },
      { text: 'column2', value: 'column2' },
      { text: 'column3', value: 'column3' },
    ];
    arrayShallowEqual.mockReturnValue(false);
    FilterHeader.mockReturnValue({
      initialValue: null,
      options: optionsNew,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <PreyLengthNormalizationContainer
        analysisType="dotplot"
        change={change}
        preyLengthNorm={false}
        preyLength={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, headerNew);
    expect(FilterHeader).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('preyLengthNorm', false);
    expect(change).toHaveBeenCalledWith('preyLength', undefined);
    expect(wrapper.state().options).toEqual(optionsNew);
    arrayShallowEqual.mockRestore();
    FilterHeader.mockRestore();
  });

  test('Store not updated when header is the same', () => {
    arrayShallowEqual.mockReturnValue(true);
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <PreyLengthNormalizationContainer
        analysisType="dotplot"
        change={change}
        preyLengthNorm={false}
        preyLength={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, header);
    expect(FilterHeader).not.toHaveBeenCalled();
    expect(wrapper.state().options).toEqual(options);
    arrayShallowEqual.mockRestore();
    FilterHeader.mockRestore();
  });
});
