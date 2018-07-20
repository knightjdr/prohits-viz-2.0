import React from 'react';
import { shallow } from 'enzyme';

import Analysis from './panel__analysis';

describe('Analysis panel', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Analysis />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
