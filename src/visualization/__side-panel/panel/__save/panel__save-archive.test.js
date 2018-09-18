import React from 'react';
import { shallow } from 'enzyme';

import Archive from './panel__save-archive';

const archive = jest.fn();

describe('Archive session component', () => {
  beforeEach(() => {
    /* Clear call count */
    archive.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Archive
        archive={archive}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call archive prop method on button click', () => {
    const wrapper = shallow(
      <Archive
        archive={archive}
      />,
    );
    wrapper.find('Button').simulate('click');
    expect(archive).toHaveBeenCalled();
  });
});
