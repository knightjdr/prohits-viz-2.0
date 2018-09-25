import React from 'react';
import { shallow } from 'enzyme';

import Warning from './warning';

describe('Visualzation warning component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Warning>
        child
      </Warning>,
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render children', () => {
    expect(wrapper.find('div').last().text()).toBe('child');
  });
});
