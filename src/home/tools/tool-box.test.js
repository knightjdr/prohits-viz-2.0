import React from 'react';
import { shallow } from 'enzyme';

import Image from '../../test/test.png';
import scrollTop from '../../helpers/scroll-top';
import ToolBox, { getImageElement } from './tool-box';

// mock ScrollTop
jest.mock('../../helpers/scroll-top');
scrollTop.mockReturnValue();

describe('Toolbox', () => {
  describe('get image element', () => {
    it('should convert image to image element when image is a component', () => {
      const image = <img alt="Toolbox" src="test" />;
      expect(getImageElement(image)).toEqual(image);
    });

    it('should convert image to image element when image is a string', () => {
      const image = <img alt="Toolbox" src="test" />;
      expect(getImageElement('test')).toEqual(image);
    });
  });

  describe('with internal link', () => {
    let wrapper;
    beforeAll(() => {
      scrollTop.mockClear();
      wrapper = shallow(
        <ToolBox
          image={Image}
          route="/test"
          text="Test"
          title="Test"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should scroll to top on clicking a nav link', () => {
      wrapper.find('.toolbox__button').simulate('click');
      expect(scrollTop).toHaveBeenCalled();
    });
  });

  describe('with external link', () => {
    let wrapper;
    beforeAll(() => {
      scrollTop.mockClear();
      wrapper = shallow(
        <ToolBox
          external
          image={Image}
          route="/test"
          text="Test"
          title="Test"
        />,
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not scroll to top on clicking a link', () => {
      wrapper.find('.toolbox__button').simulate('click');
      expect(scrollTop).not.toHaveBeenCalled();
    });
  });
});
