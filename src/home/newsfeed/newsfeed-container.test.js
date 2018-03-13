import React from 'react';
import { shallow } from 'enzyme';


import ConvertIsoDate from '../../helpers/convert-iso-date';
import FetchHome from '../../state/get/home-actions';
import { NewsfeedContainer } from './newsfeed-container';

// mock ConvertIsoDate
jest.mock('../../helpers/convert-iso-date');
ConvertIsoDate.mockReturnValue('date');

// mock fetch
jest.mock('../../state/get/home-actions');
FetchHome.mockReturnValue();

const news = [{ a: 'test', date: 'date' }];

describe('Newsfeed container', () => {
  test('Fetch home is called on mount', () => {
    shallow(
      <NewsfeedContainer
        fetchHome={FetchHome}
      />,
    );
    expect(FetchHome).toHaveBeenCalledTimes(1);
  });

  test('Update news state when news prop changes', () => {
    const wrapper = shallow(
      <NewsfeedContainer
        fetchHome={FetchHome}
      />,
    );
    wrapper.setProps({ news });
    expect(wrapper.state('news')).toEqual(news);
  });
});
