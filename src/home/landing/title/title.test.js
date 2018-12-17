import React from 'react';
import { shallow } from 'enzyme';

import Title from './title';

describe('Title', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Title />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
