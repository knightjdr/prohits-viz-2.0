import React from 'react';
import { shallow } from 'enzyme';

import Router from './router';

describe('Router', () => {
  test('It renders', () => {
    const wrapper = shallow(
      <Router />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
