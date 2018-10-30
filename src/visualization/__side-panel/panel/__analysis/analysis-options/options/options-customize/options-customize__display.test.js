import React from 'react';
import { shallow } from 'enzyme';

import CustomizeDisplay from './options-customize__display';

const handleCheckbox = jest.fn();
const update = jest.fn();

describe('Customize display subpanel', () => {
  describe('when not disabled', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <CustomizeDisplay
          disabled={false}
          handleCheckbox={handleCheckbox}
          removeEmpty={false}
          resetMaximums={false}
          update={update}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call handle check box on clicking first switch', () => {
      handleCheckbox.mockClear();
      wrapper.find('Switch').first().simulate('change', true);
      expect(handleCheckbox).toHaveBeenCalledWith('removeEmpty', true);
    });

    it('should call handle check box on clicking second switch', () => {
      handleCheckbox.mockClear();
      wrapper.find('Switch').at(1).simulate('change', true);
      expect(handleCheckbox).toHaveBeenCalledWith('resetMaximums', true);
    });

    it('should not have a disabled button', () => {
      const button = wrapper.find('Button');
      expect(button.props().disabled).toBeFalsy();
    });

    it('should call update on click', () => {
      update.mockClear();
      wrapper.find('Button').simulate('click');
      expect(update).toHaveBeenCalled();
    });
  });

  describe('when disabled', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <CustomizeDisplay
          disabled
          handleCheckbox={handleCheckbox}
          removeEmpty={false}
          resetMaximums={false}
          update={update}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not have a disabled button', () => {
      const button = wrapper.find('Button');
      expect(button.props().disabled).toBeTruthy();
    });
  });
});
