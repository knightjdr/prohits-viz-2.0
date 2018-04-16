import React from 'react';
import * as moduleToMock from 'redux';
import { shallow } from 'enzyme';

import Store, { addDevTools } from './store';

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

describe('Store in dev env', () => {
  beforeAll(() => {
    global.__REDUX_DEVTOOLS_EXTENSION__ = () => true;
  });

  test('Add dev tools if in dev env', () => {
    process.env.NODE_ENV = 'development';
    expect(addDevTools()).toBeTruthy();
  });

  test('Add dev tools if in test env', () => {
    process.env.NODE_ENV = 'test';
    expect(addDevTools()).toEqual({});
  });

  test('Do not add dev tools if in prod env', () => {
    process.env.NODE_ENV = 'production';
    expect(addDevTools()).toEqual({});
  });

  test('Do not add dev tools if not defined', () => {
    process.env.NODE_ENV = 'development';
    global.__REDUX_DEVTOOLS_EXTENSION__ = null;
    expect(addDevTools()).toEqual({});
  });
});
