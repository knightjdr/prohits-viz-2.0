import React from 'react';
import * as moduleToMock from 'redux';
import { shallow } from 'enzyme';

import Store from './store';

// mock createStore
moduleToMock.createStore = () => ('');
jest.setMock('redux', moduleToMock);

describe('Store', () => {
  test('It renders', () => {
    const wrapper = shallow(
      <Store />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
