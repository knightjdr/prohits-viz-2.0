import React from 'react';
import { shallow } from 'enzyme';

import Customize from './options-customize';

describe('Customize subpanel', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Customize
        form={{
          deleteRC: false,
          reorder: false,
          removeEmpty: false,
          resetMaximums: false,
        }}
        handleCheckbox={jest.fn()}
        undo={jest.fn()}
        undoDisabled={false}
        updateDisabled={false}
        updateImage={jest.fn()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
