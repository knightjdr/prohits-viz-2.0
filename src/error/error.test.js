import React from 'react';
import { shallow } from 'enzyme';

import Error from './error';

// mock convertIsoDate
const reportError = jest.fn();

describe('Error ', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <Error reportError={reportError} />,
    );
  });

  it('should match', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call report error on button click', () => {
    reportError.mockClear();
    wrapper.find('Button').simulate('click');
    expect(reportError).toHaveBeenCalled();
  });
});
