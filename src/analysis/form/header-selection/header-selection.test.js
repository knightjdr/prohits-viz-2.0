import React from 'react';
import { shallow } from 'enzyme';

import HeaderSelection from './header-selection';

const columns = {
  abundance: { options: [{ text: 'test', value: 'test' }] },
  condition: { options: [{ text: 'test', value: 'test' }] },
  readout: { options: [{ text: 'test', value: 'test' }] },
  score: { options: [{ text: 'test', value: 'test' }] },
};

describe('HeaderSelection', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <HeaderSelection
        columns={columns}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
