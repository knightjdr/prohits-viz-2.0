import React from 'react';
import { shallow } from 'enzyme';

import { NewsComponent } from './news';

const route = {
  noId: {
    path: '/news',
  },
  withId: {
    path: '/news/id',
  },
};

describe('News', () => {
  test('Renders list when no ID specified', () => {
    const wrapper = shallow(
      <NewsComponent
        match={route.noId}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Renders item when ID specified', () => {
    const wrapper = shallow(
      <NewsComponent
        match={route.withId}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
