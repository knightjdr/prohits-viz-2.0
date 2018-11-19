import React from 'react';
import { shallow } from 'enzyme';

import { SubmitComponent } from './submit';

jest.mock('./errors');
jest.mock('./settings');

describe('Submit component', () => {
  describe('default view', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <SubmitComponent
          errors={{}}
          form={{}}
          handleOptions={jest.fn()}
          handleReset={jest.fn()}
          showOptions={false}
          submitPending={false}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not show options', () => {
      expect(wrapper.find('.submit__show-options-icon').length).toBe(1);
    });

    it('should not show pending element', () => {
      expect(wrapper.find('.submit_pending').length).toBe(0);
    });
  });

  describe('showing options', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <SubmitComponent
          errors={{}}
          form={{}}
          handleOptions={jest.fn()}
          handleReset={jest.fn()}
          showOptions
          submitPending={false}
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not show options', () => {
      expect(wrapper.find('.submit__hide-options-icon').length).toBe(1);
    });

    it('should not show pending element', () => {
      expect(wrapper.find('.submit_pending').length).toBe(0);
    });
  });

  describe('when pending', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <SubmitComponent
          errors={{}}
          form={{}}
          handleOptions={jest.fn()}
          handleReset={jest.fn()}
          showOptions={false}
          submitPending
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show pending element', () => {
      expect(wrapper.find('.submit_pending').length).toBe(1);
    });
  });
});
