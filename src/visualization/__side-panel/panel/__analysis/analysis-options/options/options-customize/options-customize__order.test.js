import React from 'react';
import { shallow } from 'enzyme';

import CustomizeOrder from './options-customize__order';

const handleCheckbox = jest.fn();

describe('Customize display subpanel', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <CustomizeOrder
        deleteRC={false}
        handleCheckbox={handleCheckbox}
        reorder={false}
      />,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handle check box on clicking first switch', () => {
    handleCheckbox.mockClear();
    wrapper.find('Switch').first().simulate('change', true);
    expect(handleCheckbox).toHaveBeenCalledWith('deleteRC', true);
  });

  it('should call handle check box on clicking second switch', () => {
    handleCheckbox.mockClear();
    wrapper.find('Switch').at(1).simulate('change', true);
    expect(handleCheckbox).toHaveBeenCalledWith('reorder', true);
  });
});
