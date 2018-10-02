import React from 'react';
import { shallow } from 'enzyme';

import Missing from './404';
import MailTo from '../helpers/mail-to';

// mock convertIsoDate
jest.mock('../helpers/mail-to');
MailTo.mockReturnValue();

describe('404', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <Missing />,
    );
  });

  test('Renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('MailTo called when contact button clicked', () => {
    wrapper.find('Button').at(2).simulate('click');
    expect(MailTo).toHaveBeenCalledTimes(1);
    expect(MailTo).toHaveBeenCalledWith('Missing page');
  });
});
