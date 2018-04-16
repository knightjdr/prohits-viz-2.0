import React from 'react';
import { shallow } from 'enzyme';

import ControlSubtraction from './control-subtraction';

describe('ControlSubtraction', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <ControlSubtraction
        analysisType="dotplot"
        options={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
