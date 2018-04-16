import React from 'react';
import { shallow } from 'enzyme';

import { Options } from './options';

describe('DotplotOptions', () => {
  test('Renders when visible', () => {
    const wrapper = shallow(
      <Options
        change={jest.fn()}
        form={{}}
        header={['a', 'b']}
        show
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Renders when hidden', () => {
    const wrapper = shallow(
      <Options
        change={jest.fn()}
        form={{}}
        header={['a', 'b']}
        show={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
