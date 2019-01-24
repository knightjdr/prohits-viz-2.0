import React from 'react';
import { shallow } from 'enzyme';

import Tissue from './tissue';

describe('Tissue', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Tissue disableTissues={false} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
