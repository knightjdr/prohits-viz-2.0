import React from 'react';
import * as moduleToMock from 'react-router-dom';
import { shallow } from 'enzyme';

import Image from '../test/test.png';
import { SpotlightComponent } from './spotlight';

// mock NavLink
moduleToMock.NavLink = () => (
  <div />
);
jest.setMock('react-router-dom', moduleToMock);

const testArticles = [
  {
    authorLastName: 'Last name',
    description: 'test description',
    image: Image,
    pubmed: 111111,
    tool: 'test tool',
    url: 'test url',
  },
];

describe('Spotlight', () => {
  test('With articles', () => {
    const wrapper = shallow(
      <SpotlightComponent
        articles={testArticles}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Without articles', () => {
    const wrapper = shallow(
      <SpotlightComponent
        articles={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
