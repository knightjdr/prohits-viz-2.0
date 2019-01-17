import React from 'react';
import { shallow } from 'enzyme';

import { arrayShallowEqual } from '../../../../helpers/array-shallow-equal';
import ControlSubtractionContainer from './control-subtraction-container';
import FilterHeader from '../../header-selection/filter-header';

jest.mock('../../../../helpers/array-shallow-equal');

// mock filter-header
jest.mock('../../header-selection/filter-header');
const options = [
  { text: 'column1', value: 'column1' },
  { text: 'column2', value: 'column2' },
];
FilterHeader.mockReturnValue({
  initialValue: 'column1',
  options,
});

const change = jest.fn();
const header = ['column1', 'column2'];

describe('ControlSubtractionContainer', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <ControlSubtractionContainer
        analysisType="dotplot"
        change={change}
        ctrlSub={false}
        control={undefined}
        header={header}
      />,
    );
  });

  it('should set state initially on mount', () => {
    expect(wrapper.state().options).toEqual(options);
  });

  it('should check header when props change', () => {
    const componentMethod = wrapper.instance().setReduxFormState;
    wrapper.instance().setReduxFormState = jest.fn();
    wrapper.update();
    wrapper.setProps({});
    expect(wrapper.instance().setReduxFormState).toHaveBeenCalledTimes(1);
    wrapper.instance().setReduxFormState = componentMethod;
  });

  describe('setInitialReduxFormState', () => {
    describe('with control true and can be set', () => {
      beforeAll(() => {
        change.mockClear();
        FilterHeader.mockClear();
        wrapper.instance().setInitialReduxFormState(change, undefined, true, header);
      });

      it('should filter header', () => {
        expect(FilterHeader).toHaveBeenCalledTimes(1);
      });

      it('should set state', () => {
        expect(wrapper.state().options).toEqual(options);
      });

      it('should call change for ctrlSub', () => {
        expect(change).toHaveBeenCalledWith('ctrlSub', true);
      });

      it('should call change for control column', () => {
        expect(change).toHaveBeenCalledWith('control', 'column1');
      });
    });

    describe('when control is false', () => {
      beforeAll(() => {
        change.mockClear();
        wrapper.instance().setInitialReduxFormState(change, 'column1', false, header);
      });

      it('should call change for ctrlSub', () => {
        expect(change).toHaveBeenCalledWith('ctrlSub', false);
      });
    });

    describe('when there is no suggested initial value', () => {
      beforeAll(() => {
        change.mockClear();
        FilterHeader.mockReturnValueOnce({
          initialValue: null,
          options,
        });
        wrapper.instance().setInitialReduxFormState(change, undefined, true, header);
      });

      it('should call change for ctrlSub', () => {
        expect(change).toHaveBeenCalledWith('ctrlSub', false);
      });
    });

    describe('when column specified and control is true', () => {
      beforeAll(() => {
        change.mockClear();
        wrapper.instance().setInitialReduxFormState(change, 'column1', true, header);
      });

      it('should call change for ctrlSub', () => {
        expect(change).toHaveBeenCalledWith('ctrlSub', true);
      });
    });

    describe('when column not specified but can be set', () => {
      beforeAll(() => {
        change.mockClear();
        wrapper.instance().setInitialReduxFormState(change, undefined, true, header);
      });

      it('should call change for ctrlSub', () => {
        expect(change).toHaveBeenCalledWith('ctrlSub', true);
      });

      it('should call change for control column', () => {
        expect(change).toHaveBeenCalledWith('control', 'column1');
      });
    });
  });

  describe('set form state', () => {
    describe('when header changes', () => {
      afterAll(() => {
        arrayShallowEqual.mockRestore();
      });

      beforeAll(() => {
        change.mockClear();
        FilterHeader.mockClear();
        const headerNew = ['column1', 'column2', 'column3'];
        const optionsNew = [
          { text: 'column1', value: 'column1' },
          { text: 'column2', value: 'column2' },
          { text: 'column3', value: 'column3' },
        ];
        arrayShallowEqual.mockReturnValue(false);
        FilterHeader.mockReturnValueOnce({
          initialValue: 'column1',
          options: optionsNew,
        });
        wrapper.instance().setReduxFormState(change, headerNew);
      });

      it('should filter header', () => {
        expect(FilterHeader).toHaveBeenCalled();
      });

      it('should call change for ctrlSub', () => {
        expect(change).toHaveBeenCalledWith('ctrlSub', true);
      });

      it('should call change for control column', () => {
        expect(change).toHaveBeenCalledWith('control', 'column1');
      });

      it('should update state', () => {
        const expected = [
          { text: 'column1', value: 'column1' },
          { text: 'column2', value: 'column2' },
          { text: 'column3', value: 'column3' },
        ];
        expect(wrapper.state().options).toEqual(expected);
      });
    });

    describe('when header changes with no recommended column', () => {
      afterAll(() => {
        arrayShallowEqual.mockRestore();
      });

      beforeAll(() => {
        change.mockClear();
        FilterHeader.mockClear();
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
        wrapper.instance().setReduxFormState(change, headerNew);
      });

      it('should filter header', () => {
        expect(FilterHeader).toHaveBeenCalled();
      });

      it('should call change for ctrlSub', () => {
        expect(change).toHaveBeenCalledWith('ctrlSub', false);
      });

      it('should call change for control column', () => {
        expect(change).toHaveBeenCalledWith('control', undefined);
      });

      it('should update state', () => {
        const expected = [
          { text: 'column1', value: 'column1' },
          { text: 'column2', value: 'column2' },
          { text: 'column3', value: 'column3' },
        ];
        expect(wrapper.state().options).toEqual(expected);
      });
    });

    describe('when header does not change', () => {
      afterAll(() => {
        arrayShallowEqual.mockRestore();
      });

      beforeAll(() => {
        wrapper.setState({ options });
        change.mockClear();
        FilterHeader.mockClear();
        const headerNew = ['column1', 'column2', 'column3'];
        const optionsNew = [
          { text: 'column1', value: 'column1' },
          { text: 'column2', value: 'column2' },
          { text: 'column3', value: 'column3' },
        ];
        arrayShallowEqual.mockReturnValue(true);
        FilterHeader.mockReturnValue({
          initialValue: null,
          options: optionsNew,
        });
        wrapper.instance().setReduxFormState(change, headerNew);
      });

      it('should not filter header', () => {
        expect(FilterHeader).not.toHaveBeenCalled();
      });

      it('should update state', () => {
        expect(wrapper.state().options).toEqual(options);
      });
    });
  });
});
