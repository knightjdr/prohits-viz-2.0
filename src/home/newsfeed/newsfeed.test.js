import React from 'react';
import * as moduleToMock from 'react-router-dom';
import { shallow } from 'enzyme';

import { NewsfeedComponent } from './newsfeed';

// mock NavLink
moduleToMock.NavLink = () => (
  <div />
);
jest.setMock('react-router-dom', moduleToMock);

const testNews = [
  {
    date: 'Apr 25, 2018',
    headline: 'test headline',
    _id: '5aa6b120c63eb43ab21a072e',
  },
];

describe('Newsfeed', () => {
  test('Renders with news items', () => {
    const wrapper = shallow(
      <NewsfeedComponent
        news={testNews}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Renders without news items', () => {
    const wrapper = shallow(
      <NewsfeedComponent
        news={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
