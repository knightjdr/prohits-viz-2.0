import React from 'react';
import { shallow } from 'enzyme';

import { SubmitComponent } from './submit';

jest.mock('./errors');
jest.mock('./settings');

describe('SubmitComponent', () => {
  test('Renders submit view without options', () => {
    const wrapper = shallow(
      <SubmitComponent
        errors={{}}
        form={{}}
        handleOptions={jest.fn()}
        handleReset={jest.fn()}
        showOptions={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.Submit-hide-options-icon').length).toBe(0);
    expect(wrapper.find('.Submit-show-options-icon').length).toBe(1);
  });

  test('Renders submit view with options', () => {
    const wrapper = shallow(
      <SubmitComponent
        errors={{}}
        form={{}}
        handleOptions={jest.fn()}
        handleReset={jest.fn()}
        showOptions
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.Submit-hide-options-icon').length).toBe(1);
    expect(wrapper.find('.Submit-show-options-icon').length).toBe(0);
  });
});
