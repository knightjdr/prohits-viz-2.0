import React from 'react';
import { shallow } from 'enzyme';

import convertToForm from './submission/convert-to-form';
import formSubmit from './submission/form-submit';
import InitialValues from './initial-values/initial-values';
import { FormContainerComponent } from './form-container';

jest.mock('./submission/convert-to-form');
jest.mock('./submission/form-submit');
jest.mock('./initial-values/initial-values');
InitialValues.mockReturnValue({ initialValue: 'testInitial' });

const clearStep = jest.fn();

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

describe('FormContainerComponent', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <FormContainerComponent
        clearStep={clearStep}
        form={{}}
        session="sessionID"
      />,
    );
  });

  it('should set initial state', () => {
    expect(wrapper.state().initialValues).toEqual({});
  });

  describe('prop change', () => {
    beforeAll(() => {
      wrapper.setState({ initialValues: {} });
    });

    it('should not update initial values when analysisType does not change via props', () => {
      wrapper.setProps({
        form: {
          analysisType: undefined,
        },
      });
      const expectedState = {
        analysisType: undefined,
      };
      expect(wrapper.state().initialValues).toEqual(expectedState);
    });

    it('should update initial values when analysisType changes via props', () => {
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
  });

  describe('form submission', () => {
    const obj = { analysisType: 'dotplot' };

    describe('success', () => {
      beforeAll(async (done) => {
        convertToForm.mockClear();
        convertToForm.mockReturnValue({});
        formSubmit.mockClear();
        formSubmit.mockImplementation(() => Promise.resolve('taskid'));
        wrapper.instance().onSubmit(obj);
        await sleep(200);
        done();
      });

      it('should convert to form object', () => {
        expect(convertToForm).toHaveBeenCalledWith(obj);
      });

      it('should submit form', () => {
        expect(formSubmit).toHaveBeenCalledWith({}, 'sessionID', 'dotplot');
      });

      it('should set task id', () => {
        expect(wrapper.state().taskID).toBe('taskid');
      });

      it('should clear errors', () => {
        expect(wrapper.state().errors).toEqual({});
      });
    });

    describe('failure', () => {
      beforeAll(async (done) => {
        convertToForm.mockClear();
        convertToForm.mockReturnValue({});
        formSubmit.mockClear();
        formSubmit.mockImplementation(() => Promise.reject(new Error('taskid')));
        wrapper.instance().onSubmit(obj);
        await sleep(200);
        done();
      });

      it('should convert to form object', () => {
        expect(convertToForm).toHaveBeenCalledWith(obj);
      });

      it('should submit form', () => {
        expect(formSubmit).toHaveBeenCalledWith({}, 'sessionID', 'dotplot');
      });

      it('should clear errors', () => {
        expect(wrapper.state().analysisError).toBeTruthy();
      });
    });
  });

  it('should update state with errors when submission fails', () => {
    wrapper.instance().onSubmitFail({ errors: 'test' });
    expect(wrapper.state().errors).toEqual({ errors: 'test' });
  });

  it('should close analysis error modal', () => {
    wrapper.setState({ analysisError: true });
    wrapper.instance().closeError();
    expect(wrapper.state().analysisError).toBeFalsy();
  });

  it('should clear task ID on closing modal', () => {
    wrapper.setState({ taskID: 'abc' });
    wrapper.instance().closeStatus();
    expect(wrapper.state().taskID).toBeNull();
  });

  it('should change boolean status of state via handleOptions ', () => {
    wrapper.setState({ showOptions: false });
    wrapper.instance().handleOptions();
    expect(wrapper.state().showOptions).toBeTruthy();
  });

  describe('reset', () => {
    describe('successfully', () => {
      beforeAll(() => {
        clearStep.mockClear();
        wrapper.setProps({
          form: {
            analysisType: 'dotplot',
          },
        });
        wrapper.setState({
          initialValues: {
            analysisType: 'dotplot',
            initialValue: 'newValue',
          },
        });
        wrapper.instance().handleReset();
      });

      it('should reset inital values back to default when analysisType is set', () => {
        expect(wrapper.state().initialValues).toEqual({
          initialValue: 'testInitial',
        });
      });

      it('should call clear step', () => {
        expect(clearStep).toHaveBeenCalled();
      });
    });

    it('should not reset initial values when there is no analysis type', () => {
      wrapper.setProps({
        form: {
        },
      });
      wrapper.setState({
        initialValues: {
          initialValue: 'newValue',
        },
      });
      wrapper.instance().handleReset();
      expect(wrapper.state().initialValues).toEqual({ initialValue: 'newValue' });
    });
  });

  describe('update type', () => {
    beforeAll(() => {
      wrapper.setState({
        initialValues: {
          analysisType: 'dotplot',
          initialValue: 'newValue',
        },
      });
    });

    it('should not update when type does not change', () => {
      wrapper.instance().updateType({ form: { analysisType: 'dotplot' } }, 'dotplot');
      const expectedState = {
        analysisType: 'dotplot',
        initialValue: 'newValue',
      };
      expect(wrapper.state().initialValues).toEqual(expectedState);
    });

    it('should update when type changes', () => {
      wrapper.instance().updateType({ form: { analysisType: 'correlation' } }, 'dotplot');
      const expectedState = {
        analysisType: 'correlation',
        initialValue: 'testInitial',
      };
      expect(wrapper.state().initialValues).toEqual(expectedState);
    });
  });
});
