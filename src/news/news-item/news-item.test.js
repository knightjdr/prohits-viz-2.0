import React from 'react';
import { shallow } from 'enzyme';

import textToHtml from '../../helpers/text-to-html';
import { NewsItemComponent } from './news-item';

// mock textToHtml
jest.mock('../../helpers/text-to-html');
textToHtml.mockReturnValue('test');

const testItem = {
  error: {
    error: true,
    isLoaded: false,
    isLoading: false,
    item: {},
  },
  init: {
    error: false,
    isLoaded: false,
    isLoading: false,
    item: {},
  },
  loaded: {
    error: false,
    isLoaded: true,
    isLoading: false,
    item: {
      date: 'test',
      details: 'test',
      hashtags: ['#test'],
      headline: 'test',
      _id: 'abcd',
    },
  },
  loading: {
    error: false,
    isLoaded: false,
    isLoading: true,
    item: {},
  },
};

describe('News item', () => {
  it('should render initially', () => {
    const wrapper = shallow(
      <NewsItemComponent
        newsItem={testItem.init}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render when loading', () => {
    const wrapper = shallow(
      <NewsItemComponent
        newsItem={testItem.loading}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Spin').length).toBe(1);
  });

  it('should render when loaded', () => {
    const wrapper = shallow(
      <NewsItemComponent
        newsItem={testItem.loaded}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.News-item-content').length).toBe(1);
  });

  it('should render with error', () => {
    const wrapper = shallow(
      <NewsItemComponent
        newsItem={testItem.error}
      />,
    );
    expect(wrapper).toMatchSnapshot();
    const text = wrapper.find('.News-item-message').text();
    const re = RegExp('There was an error retrieving this story');
    expect(re.test(text)).toBeTruthy();
  });
});
