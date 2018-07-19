import React from 'react';
import { shallow } from 'enzyme';

import Image from './panel__save-image';

const handleImageType = jest.fn();
const saveImage = jest.fn();

describe('Save image component', () => {
  beforeEach(() => {
    /* Clear call count */
    handleImageType.mockClear();
    saveImage.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <Image
        handleImageType={handleImageType}
        imageType="svg"
        saveImage={saveImage}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handle image prop method on select change', () => {
    const wrapper = shallow(
      <Image
        handleImageType={handleImageType}
        imageType="svg"
        saveImage={saveImage}
      />,
    );
    wrapper.find('Select').simulate('change');
    expect(handleImageType).toHaveBeenCalled();
  });

  it('should call save image prop method on button click', () => {
    const wrapper = shallow(
      <Image
        handleImageType={handleImageType}
        imageType="svg"
        saveImage={saveImage}
      />,
    );
    wrapper.find('button').simulate('click');
    expect(saveImage).toHaveBeenCalled();
  });
});
