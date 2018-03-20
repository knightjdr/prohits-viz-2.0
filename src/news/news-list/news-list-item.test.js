import React from 'react';
import { shallow } from 'enzyme';

import NewsListItem from './news-list-item';

const item = {
  _id: 'test',
  date: 'test',
  details: 'test',
  headline: 'test',
};

describe('NewsListItem', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <NewsListItem
        item={item}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
