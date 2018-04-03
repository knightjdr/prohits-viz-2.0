import React from 'react';
import { shallow } from 'enzyme';

import IsNotEmpty from '../../../helpers/is-not-empty';
import { NextStepComponent } from './next-step';

jest.mock('../../../helpers/is-not-empty');

const onClick = jest.fn();

describe('NextStepComponent', () => {
  test('Renders nothing when not current step', () => {
    const wrapper = shallow(
      <NextStepComponent
        currentStep={0}
        form={{}}
        needed={[]}
        onClick={onClick}
        step={1}
      />,
    );
    expect(wrapper.find('div').length).toBe(0);
  });

  test('Renders nothing when at current step but needed to do not match form', () => {
    IsNotEmpty
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    const wrapper = shallow(
      <NextStepComponent
        currentStep={1}
        form={{
          item1: 'a',
          item2: null,
        }}
        needed={['item1', 'item2']}
        onClick={onClick}
        step={1}
      />,
    );
    expect(wrapper.find('div').length).toBe(0);
  });

  test('Renders nothing when at current step but needed to do not match form', () => {
    IsNotEmpty
      .mockReturnValue(true);
    const wrapper = shallow(
      <NextStepComponent
        currentStep={1}
        form={{
          item1: 'a',
          item2: 'b',
        }}
        needed={['item1', 'item2']}
        onClick={onClick}
        step={1}
      />,
    );
    const divs = wrapper.find('div');
    expect(divs.length).toBe(1);
    expect(divs.hasClass('NextStep-container')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('Clicking button triggers onClick', () => {
    IsNotEmpty
      .mockReturnValue(true);
    const wrapper = shallow(
      <NextStepComponent
        currentStep={1}
        form={{
          item1: 'a',
          item2: 'b',
        }}
        needed={['item1', 'item2']}
        onClick={onClick}
        step={1}
      />,
    );
    const button = wrapper.find('Button');
    button.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
