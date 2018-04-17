import React from 'react';
import { shallow } from 'enzyme';

import { FormContainerComponent } from './form-container';
import InitialValues from './initial-values/initial-values';

jest.mock('./initial-values/initial-values');
InitialValues.mockReturnValue({ initialValue: 'testInitial' });

describe('FormContainerComponent', () => {
  test('Initial state', () => {
    const wrapper = shallow(
      <FormContainerComponent
        form={{}}
      />,
    );
    expect(wrapper.state().errors).toEqual({});
    expect(wrapper.state().initialValues).toEqual({});
    expect(wrapper.state().showOptions).toBeFalsy();
  });

  test('When analysisType changes via props, update initial values', () => {
    const wrapper = shallow(
      <FormContainerComponent
        form={{}}
      />,
    );
    expect(wrapper.state().initialValues).toEqual({});
    wrapper.setProps({
      form: {
        analysisType: 'dotplot',
      },
    });
    const expectedState = {
      analysisType: 'dotplot',
      initialValue: 'testInitial',
    };
    expect(wrapper.state().initialValues).toEqual(expectedState);
  });

  test('When analysisType does not change, do not update state', () => {
    const wrapper = shallow(
      <FormContainerComponent
        form={{
          analysisType: 'dotplot',
        }}
      />,
    );
    expect(wrapper.state().initialValues).toEqual({ analysisType: 'dotplot' });
    wrapper.setProps({
      form: {
        analysisType: 'dotplot',
      },
    });
    expect(wrapper.state().initialValues).toEqual({ analysisType: 'dotplot' });
  });

  test('Update state with errors when submission fails', () => {
    const wrapper = shallow(
      <FormContainerComponent
        form={{}}
      />,
    );
    wrapper.instance().onSubmitFail({ errors: 'test' });
    expect(wrapper.state().errors).toEqual({ errors: 'test' });
  });

  test('handleOptions changes boolean status of state', () => {
    const wrapper = shallow(
      <FormContainerComponent
        form={{}}
      />,
    );
    expect(wrapper.state().showOptions).toBeFalsy();
    wrapper.instance().handleOptions();
    expect(wrapper.state().showOptions).toBeTruthy();
  });

  test('Submission resets errors', () => {
    const wrapper = shallow(
      <FormContainerComponent
        form={{}}
      />,
    );
    wrapper.instance().onSubmitFail({ errors: 'test' });
    expect(wrapper.state().errors).toEqual({ errors: 'test' });
    wrapper.instance().onSubmit();
    expect(wrapper.state().errors).toEqual({});
  });

  test('Reset sets inital values back to default when analysisType is set', () => {
    const wrapper = shallow(
      <FormContainerComponent
        form={{
          analysisType: 'dotplot',
          initialValue: 'newValue',
        }}
      />,
    );
    expect(wrapper.state().initialValues).toEqual({
      analysisType: 'dotplot',
      initialValue: 'newValue',
    });
    wrapper.instance().handleReset();
    expect(wrapper.state().initialValues).toEqual({
      analysisType: 'dotplot',
      initialValue: 'testInitial',
    });
  });

  test('Reset does not reset initial values when there is no analysis type', () => {
    const wrapper = shallow(
      <FormContainerComponent
        form={{
          initialValue: 'newValue',
        }}
      />,
    );
    expect(wrapper.state().initialValues).toEqual({ initialValue: 'newValue' });
    wrapper.instance().handleReset();
    expect(wrapper.state().initialValues).toEqual({ initialValue: 'newValue' });
  });
});
