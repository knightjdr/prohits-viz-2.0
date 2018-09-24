import React from 'react';
import { shallow } from 'enzyme';

import Heatmap from './visualization__heatmap';

describe('Heatmap interface', () => {
  it('should render', () => {
    const wrapper = shallow(<Heatmap />);
    expect(wrapper).toMatchSnapshot();
  });
});
