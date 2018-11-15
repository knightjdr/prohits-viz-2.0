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
  it('should render list when no ID specified', () => {
    const wrapper = shallow(
      <NewsComponent
        match={route.noId}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render item when ID specified', () => {
    const wrapper = shallow(
      <NewsComponent
        match={route.withId}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
