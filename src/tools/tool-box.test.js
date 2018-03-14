import React from 'react';
import * as moduleToMock from 'react-router-dom';
import { shallow } from 'enzyme';

import Image from '../test/test.png';
import ScrollTop from '../helpers/scroll-top';
import ToolBox from './tool-box';

// mock ScrollTop
jest.mock('../helpers/scroll-top');
ScrollTop.mockReturnValue();

// mock NavLink
moduleToMock.NavLink = () => (
  <div />
);
jest.setMock('react-router-dom', moduleToMock);

describe('Toolbox', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <ToolBox
        image={Image}
        route="/test"
        text="Test"
        title="Test"
      />,
    );
  });

  test('It renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Clicking a nav link scrolls to top', () => {
    wrapper.find('.Toolbox-button').simulate('click');
    expect(ScrollTop).toHaveBeenCalledTimes(1);
  });
});
