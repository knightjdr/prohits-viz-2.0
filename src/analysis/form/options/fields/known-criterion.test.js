import React from 'react';
import { shallow } from 'enzyme';

import KnownCriterion from './known-criterion';

jest.mock('../../field/default-change');

describe('Known criterion', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<KnownCriterion />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
