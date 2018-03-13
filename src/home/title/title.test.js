import React from 'react';
import { shallow } from 'enzyme';

import Title from './title';

describe('Title', () => {
  test('It renders', () => {
    const wrapper = shallow(
      <Title />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
