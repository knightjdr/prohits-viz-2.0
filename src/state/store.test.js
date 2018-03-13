import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

import Store from './store';

describe('App', () => {
  test('It renders', () => {
    const wrapper = shallow(
      <Store />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
