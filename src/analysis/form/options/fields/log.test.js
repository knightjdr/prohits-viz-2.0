import React from 'react';
import { shallow } from 'enzyme';

import Log from './log';

describe('Log', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <Log
        analysisType="dotplot"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
