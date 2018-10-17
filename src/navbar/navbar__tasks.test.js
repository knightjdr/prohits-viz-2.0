import React from 'react';
import { shallow } from 'enzyme';

import Tasks from './navbar__tasks';

jest.mock('../components/router-link/router-link');

describe('Navbar tasks', () => {
  it('should return null when there are no tasks', () => {
    const wrapper = shallow(
      <Tasks
        smallScreen={false}
        tasks={[]}
      />,
    );
    expect(wrapper.getElement()).toBeNull();
  });

  it('should match snapshot when there are tasks', () => {
    const wrapper = shallow(
      <Tasks
        smallScreen={false}
        tasks={['task1']}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when there are tasks on a small screen', () => {
    const wrapper = shallow(
      <Tasks
        smallScreen
        tasks={['task1']}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
