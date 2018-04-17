import React from 'react';
import { shallow } from 'enzyme';

import ArrayShallowEqual from '../../../../helpers/array-shallow-equal';
import ControlSubtractionContainer from './control-subtraction-container';
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

describe('ControlSubtractionContainer', () => {
  test('Store set on mount', () => {
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub={false}
        control={undefined}
        header={header}
      />,
    );
    expect(wrapper.state().options).toEqual(options);
    FilterHeader.mockRestore();
  });

  test(`Store updated via setInitialReduxFormState when control is true and
    can be set`, () => {
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub
        control={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, undefined, true, header);
    expect(FilterHeader).toHaveBeenCalledTimes(1);
    expect(wrapper.state().options).toEqual(options);
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('ctrlSub', true);
    expect(change).toHaveBeenCalledWith('control', 'column1');
    FilterHeader.mockRestore();
  });

  test(`Store not updated via setInitialReduxFormState when control has been
    turned off by user on it's initial mounting`, () => {
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub={false}
        control="column1"
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, 'column1', false, header);
    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith('ctrlSub', false);
    FilterHeader.mockRestore();
  });

  test(`Store not updated via setInitialReduxFormState when there is no
    suggested intial value`, () => {
    FilterHeader.mockReturnValue({
      initialValue: null,
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub
        control={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, undefined, true, header);
    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith('ctrlSub', false);
    FilterHeader.mockRestore();
  });

  test('Store set via setInitialReduxFormState on remounting', () => {
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub
        control="column1"
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, 'column1', true, header);
    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith('ctrlSub', true);
    FilterHeader.mockRestore();
  });

  test('Store set via setInitialReduxFormState on remounting when no control column', () => {
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub
        control={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setInitialReduxFormState(change, undefined, true, header);
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('ctrlSub', true);
    expect(change).toHaveBeenCalledWith('control', 'column1');
    FilterHeader.mockRestore();
  });

  test('Check header when props change', () => {
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub={false}
        control={undefined}
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

  test('Store updated when header changes', () => {
    const headerNew = ['column1', 'column2', 'column3'];
    const optionsNew = [
      { text: 'column1', value: 'column1' },
      { text: 'column2', value: 'column2' },
      { text: 'column3', value: 'column3' },
    ];
    ArrayShallowEqual.mockReturnValue(false);
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options: optionsNew,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub={false}
        control={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, headerNew);
    expect(FilterHeader).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('ctrlSub', true);
    expect(change).toHaveBeenCalledWith('control', 'column1');
    expect(wrapper.state().options).toEqual(optionsNew);
    ArrayShallowEqual.mockRestore();
    FilterHeader.mockRestore();
  });

  test('Store not updated when header changes and no recommended column', () => {
    const headerNew = ['column1', 'column2', 'column3'];
    const optionsNew = [
      { text: 'column1', value: 'column1' },
      { text: 'column2', value: 'column2' },
      { text: 'column3', value: 'column3' },
    ];
    ArrayShallowEqual.mockReturnValue(false);
    FilterHeader.mockReturnValue({
      initialValue: null,
      options: optionsNew,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub={false}
        control={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, headerNew);
    expect(FilterHeader).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('ctrlSub', false);
    expect(change).toHaveBeenCalledWith('control', undefined);
    expect(wrapper.state().options).toEqual(optionsNew);
    ArrayShallowEqual.mockRestore();
    FilterHeader.mockRestore();
  });

  test('Store not updated when header is the same', () => {
    ArrayShallowEqual.mockReturnValue(true);
    FilterHeader.mockReturnValue({
      initialValue: 'column1',
      options,
    });
    /* this is just for mounting, not for running the test. The actual test
    ** is run with wrapper.instance() but I'm using props consistent with the
    ** function call */
    const wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub={false}
        control={undefined}
        header={header}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().setReduxFormState(change, header);
    expect(FilterHeader).not.toHaveBeenCalled();
    expect(wrapper.state().options).toEqual(options);
    ArrayShallowEqual.mockRestore();
    FilterHeader.mockRestore();
  });
});
