import React from 'react';
import { shallow } from 'enzyme';

import Output from './output-dotplot';

describe('Output', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Output
        analysisType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
