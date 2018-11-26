import React from 'react';
import { shallow } from 'enzyme';

import Analysis from './analysis';

describe('Analysis', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Analysis />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
