import React from 'react';
import { shallow } from 'enzyme';

import { ClickOutsideWrapper } from './click-outside';

const callback = jest.fn();

describe('ClickOutside', () => {
  test('clicking outside child should call callback prop', () => {
    const wrapper = shallow(
      <ClickOutsideWrapper callback={callback}>
        <div />
      </ClickOutsideWrapper>,
    );
    wrapper.instance().handleClickOutside();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
