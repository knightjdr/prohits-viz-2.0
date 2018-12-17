import React from 'react';
import { shallow } from 'enzyme';

import Video from './video';

describe('Home video', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Video />);
    expect(wrapper).toMatchSnapshot();
  });
});
