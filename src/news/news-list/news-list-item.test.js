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
  it('should render and match snapshot', () => {
    const wrapper = shallow(
      <NewsListItem
        item={item}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
