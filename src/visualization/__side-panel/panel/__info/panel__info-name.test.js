import React from 'react';
import { shallow } from 'enzyme';

import Name from './panel__info-name';

const loadNewFile = jest.fn();

describe('Name component on info panel', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Name
        loadNewFile={loadNewFile}
        name="test"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call load new file prop method when button clicked', () => {
    const wrapper = shallow(
      <Name
        loadNewFile={loadNewFile}
        name="test"
      />,
    );
    wrapper.find('Popconfirm').prop('onConfirm')();
    expect(loadNewFile).toHaveBeenCalledTimes(1);
  });
});
