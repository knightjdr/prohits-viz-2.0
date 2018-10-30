import React from 'react';
import { shallow } from 'enzyme';

import CustomizeUndo from './options-customize__undo';

const undo = jest.fn();

describe('Customize undo subpanel', () => {
  describe('when not disabled', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <CustomizeUndo
          disabled={false}
          undo={undo}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not have a disabled button', () => {
      const button = wrapper.find('Button');
      expect(button.props().disabled).toBeFalsy();
    });
  });

  describe('when disabled', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <CustomizeUndo
          disabled
          undo={undo}
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
