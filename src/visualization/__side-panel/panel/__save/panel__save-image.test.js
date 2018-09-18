import React from 'react';
import { shallow } from 'enzyme';

import Image from './panel__save-image';

const handleImageType = jest.fn();
const saveImage = jest.fn();

describe('Save image component', () => {
  describe('with no save status', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Image
          handleImageType={handleImageType}
          imageType="svg"
          isSaving={false}
          saveError={false}
          saveImage={saveImage}
        />,
      );
    });

    beforeEach(() => {
      /* Clear call count */
      handleImageType.mockClear();
      saveImage.mockClear();
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call handle image prop method on select change', () => {
      wrapper.find('Select').simulate('change');
      expect(handleImageType).toHaveBeenCalled();
    });

    it('should call save image prop method on button click', () => {
      wrapper.find('Button').simulate('click');
      expect(saveImage).toHaveBeenCalled();
    });

    it('should not show notification containers', () => {
      const notifications = wrapper.find('.panel__save-notification');
      expect(notifications.length).toBe(0);
    });
  });

  describe('with save status', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(
        <Image
          handleImageType={handleImageType}
          imageType="svg"
          isSaving
          saveError
          saveImage={saveImage}
        />,
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should show notification containers', () => {
      const notifications = wrapper.find('.panel__save-notification');
      expect(notifications.length).toBe(2);
    });
  });
});
