import React from 'react';
import * as moduleToMock from 'react-router-dom';
import { shallow } from 'enzyme';

import Image from '../test/test.png';
import ScrollTop from '../helpers/scroll-top';
import ToolBox, { getImageElement } from './tool-box';

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
    wrapper.find('.toolbox__button').simulate('click');
    expect(ScrollTop).toHaveBeenCalledTimes(1);
  });

  test('Images are converted into image element', () => {
    const image = <img alt="Toolbox" src="test" />;
    // if the image is already a component, return it
    expect(getImageElement(image)).toEqual(image);
    // if the image is a string or path, create image element for it
    expect(getImageElement('test')).toEqual(image);
  });
});
