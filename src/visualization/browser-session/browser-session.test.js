import React from 'react';
import { shallow } from 'enzyme';

import BrowserSession from './browser-session';

jest.mock('./browser-session__table');
jest.mock('../browser-storage/indexeddb-container');

describe('Browser stored sessions', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<BrowserSession />);
    expect(wrapper).toMatchSnapshot();
  });
});
