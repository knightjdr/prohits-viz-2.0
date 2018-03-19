import React from 'react';
import { shallow } from 'enzyme';

import { News } from './news';

const route = {
  pathname: '/news',
};

describe('News', () => {
  test('It renders list when no ID specified', () => {
    const wrapper = shallow(
      <News
        location={route}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
