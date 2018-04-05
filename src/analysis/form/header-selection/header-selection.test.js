import React from 'react';
import { shallow } from 'enzyme';

import HeaderSelection from './header-selection';

const columns = {
  abundance: { options: [{ text: 'test', value: 'test' }] },
  bait: { options: [{ text: 'test', value: 'test' }] },
  prey: { options: [{ text: 'test', value: 'test' }] },
  score: { options: [{ text: 'test', value: 'test' }] },
};

describe('HeaderSelection', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <HeaderSelection
        columns={columns}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
