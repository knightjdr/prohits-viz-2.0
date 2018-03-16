import React from 'react';
import { shallow } from 'enzyme';

import Missing from './404';
import MailTo from '../helpers/mail-to';

// mock ConvertIsoDate
jest.mock('../helpers/mail-to');
MailTo.mockReturnValue();

describe('404', () => {
  test('It renders', () => {
    const wrapper = shallow(
      <Missing />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
