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

  it('should match', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should open MailTo when contact button clicked', () => {
    wrapper.find('Button').at(2).simulate('click');
    expect(MailTo).toHaveBeenCalledWith('404: missing page');
  });
});
