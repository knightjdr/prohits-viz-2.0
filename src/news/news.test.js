import React from 'react';
import { shallow } from 'enzyme';

import { News } from './news';

const route = {
  path: '/news',
};

describe('News', () => {
  test('It renders list when no ID specified', () => {
    const wrapper = shallow(
      <News
        match={route}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
