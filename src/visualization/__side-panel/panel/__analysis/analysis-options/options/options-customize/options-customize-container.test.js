import React from 'react';
import { shallow } from 'enzyme';

import { CustomizeContainer } from './options-customize-container';

const setCustomizeParameters = jest.fn();
const undo = jest.fn();
const updateImage = jest.fn();

describe('Customize container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <CustomizeContainer
        customize={[{}]}
        form={{
          deleteRC: false,
          reorder: false,
          removeEmpty: false,
          resetMaximums: false,
        }}
        setCustomizeParameters={setCustomizeParameters}
        tab="customize"
        undo={undo}
        updateImage={updateImage}
      />,
    );
  });

  describe('set state on mount', () => {
    it('should set current array index', () => {
      expect(wrapper.instance().newestIndex).toBe(0);
    });

    it('should disable undo button', () => {
      expect(wrapper.state().undoDisabled).toBeTruthy();
    });

    it('should enable update button', () => {
      expect(wrapper.state().updateDisabled).toBeFalsy();
    });
  });

  describe('receiving props', () => {
    beforeAll(() => {
      wrapper.setProps({
        customize: [{}, {}],
      });
    });

    it('should update index', () => {
      expect(wrapper.instance().newestIndex).toBe(1);
    });

    it('should enable undo button when customize length is >= 2', () => {
      expect(wrapper.state().undoDisabled).toBeFalsy();
    });

    it('should enable update button when customize length is >= 1', () => {
      expect(wrapper.state().updateDisabled).toBeFalsy();
    });
  });

  describe('get last customize item index', () => {
    it('should return zero when array is empty', () => {
      expect(wrapper.instance().getIndex([])).toBe(0);
    });

    it('should return last index in customize array', () => {
      expect(wrapper.instance().getIndex([{}, {}])).toBe(1);
    });
  });

  describe('handle checkbox', () => {
    beforeAll(() => {
      wrapper.setProps({
        form: {
          deleteRC: false,
          reorder: false,
          removeEmpty: false,
          resetMaximums: false,
        },
      });
    });

    it('should set field to opposite boolean state of form prop', () => {
      setCustomizeParameters.mockClear();
      wrapper.instance().handleCheckbox('removeEmpty');
      const expectedParameters = {
        removeEmpty: true,
      };
      expect(setCustomizeParameters).toHaveBeenCalledWith(expectedParameters);
    });

    it('should falsify reorder when deleteRC will be set to true', () => {
      wrapper.setProps({
        form: {
          deleteRC: false,
          reorder: true,
          removeEmpty: false,
          resetMaximums: false,
        },
      });
      setCustomizeParameters.mockClear();
      wrapper.instance().handleCheckbox('deleteRC');
      const expectedParameters = {
        deleteRC: true,
        reorder: false,
      };
      expect(setCustomizeParameters).toHaveBeenCalledWith(expectedParameters);
    });

    it('should falsify deleteRC when reorder will be set to true', () => {
      wrapper.setProps({
        form: {
          deleteRC: true,
          reorder: false,
          removeEmpty: false,
          resetMaximums: false,
        },
      });
      setCustomizeParameters.mockClear();
      wrapper.instance().handleCheckbox('reorder');
      const expectedParameters = {
        deleteRC: false,
        reorder: true,
      };
      expect(setCustomizeParameters).toHaveBeenCalledWith(expectedParameters);
    });
  });

  describe('undo disabled state', () => {
    it('should be true when customize array length is < 2', () => {
      expect(wrapper.instance().shouldUndoBeDisabled([{}])).toBeTruthy();
    });

    it('should be true when customize array is undefined', () => {
      expect(wrapper.instance().shouldUndoBeDisabled(undefined)).toBeTruthy();
    });

    it('should be false when customize array length is >= 2', () => {
      expect(wrapper.instance().shouldUndoBeDisabled([{}, {}])).toBeFalsy();
    });
  });

  describe('update disabled state', () => {
    it('should be true when customize array length is < 1', () => {
      expect(wrapper.instance().shouldUpdateBeDisabled([])).toBeTruthy();
    });

    it('should be true when customize array is undefined', () => {
      expect(wrapper.instance().shouldUpdateBeDisabled(undefined)).toBeTruthy();
    });

    it('should be false when customize array length is >= 1', () => {
      expect(wrapper.instance().shouldUpdateBeDisabled([{}])).toBeFalsy();
    });
  });

  describe('undo', () => {
    it('should call undo prop method when tab is "customize" and undo is not disabled', () => {
      undo.mockClear();
      wrapper.setProps({ tab: 'customize' });
      wrapper.setState({ undoDisabled: false });
      wrapper.instance().undo();
      expect(undo).toHaveBeenCalled();
    });

    it('should not call undo prop method when tab is not "customize"', () => {
      undo.mockClear();
      wrapper.setProps({ tab: 'main' });
      wrapper.setState({ undoDisabled: false });
      wrapper.instance().undo();
      expect(undo).not.toHaveBeenCalled();
    });

    it('should not call undo prop method when undo is disabled', () => {
      undo.mockClear();
      wrapper.setProps({ tab: 'customize' });
      wrapper.setState({ undoDisabled: true });
      wrapper.instance().undo();
      expect(undo).not.toHaveBeenCalled();
    });
  });

  describe('update image', () => {
    beforeAll(() => {
      wrapper.setProps({
        customize: [{}],
        form: {
          deleteRC: false,
          reorder: false,
          removeEmpty: false,
          resetMaximums: false,
        },
      });
    });

    it('should not call update image prop when tab is not "customize"', () => {
      updateImage.mockClear();
      wrapper.setProps({ tab: 'main' });
      wrapper.instance().updateImage();
      expect(updateImage).not.toHaveBeenCalled();
    });

    it('should call update image prop when tab is "customize"', () => {
      updateImage.mockClear();
      wrapper.setProps({ tab: 'customize' });
      wrapper.instance().updateImage();
      expect(updateImage).toHaveBeenCalledWith({}, false, false);
    });
  });
});
