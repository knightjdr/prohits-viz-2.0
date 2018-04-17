import React from 'react';
import { shallow } from 'enzyme';

import { OptionsComponent } from './options';

describe('DotplotOptions', () => {
  test('Renders when visible', () => {
    const wrapper = shallow(
      <OptionsComponent
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
      <OptionsComponent
        change={jest.fn()}
        form={{}}
        header={['a', 'b']}
        show={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
