import React from 'react';
import { shallow } from 'enzyme';

import Name from './panel__info-name';

const loadNewFile = jest.fn();

describe('Name component on info panel', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Name
        loadNewFile={loadNewFile}
        name="test"
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call load new file prop method when button clicked', () => {
    loadNewFile.mockClear();
    wrapper.find('Popconfirm').prop('onConfirm')();
    expect(loadNewFile).toHaveBeenCalledTimes(1);
  });
});
