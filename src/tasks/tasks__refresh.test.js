import React from 'react';
import { shallow } from 'enzyme';

import Refresh from './tasks__refresh';

const handleClick = jest.fn();

describe('Tasks refresh', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Refresh handleClick={handleClick} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handle click', () => {
    wrapper.find('RoundButton').simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
