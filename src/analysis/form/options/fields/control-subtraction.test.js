import React from 'react';
import { shallow } from 'enzyme';

import ControlSubtraction from './control-subtraction';

describe('ControlSubtraction', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <ControlSubtraction
        analysisType="dotplot"
        options={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
