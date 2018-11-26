import React from 'react';
import { shallow } from 'enzyme';

import Help from './help';

describe('Help', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Help />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
