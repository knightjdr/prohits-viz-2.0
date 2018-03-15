import React from 'react';
import { shallow } from 'enzyme';

import FetchNewsItem from '../state/get/news-item-actions';
import { NewsItemContainer } from './news-item-container';

// mock fetch
jest.mock('../state/get/news-item-actions');
FetchNewsItem.mockReturnValue();

const match = {
  params: {
    newsId: 'a',
  },
};

describe('NewsItemContainer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Fetch news is called on mount', () => {
    shallow(
      <NewsItemContainer
        fetchNewsItem={FetchNewsItem}
        match={match}
      />,
    );
    expect(FetchNewsItem).toHaveBeenCalledTimes(1);
  });
});
