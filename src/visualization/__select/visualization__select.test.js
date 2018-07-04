import React from 'react';
import { shallow } from 'enzyme';

import Selection from './visualization__select';

const handleFile = jest.fn();

describe('Selection', () => {
  test('Default view', () => {
    const wrapper = shallow(
      <Selection
        err=""
        handleFile={handleFile}
      />,
    );
    expect(wrapper).toMatchSnapshot();

    // The error element should not be visible (scale = 0).
    const errorDiv = wrapper.find('.visualization__select-error');
    expect(errorDiv.props().style.transform).toBe('scaleY(0)');
  });

  test('Displays an error', () => {
    const wrapper = shallow(
      <Selection
        err="Test error"
        handleFile={handleFile}
      />,
    );
    expect(wrapper).toMatchSnapshot();

    // The error element should be visible (scale = 1) and display text.
    const errorDiv = wrapper.find('.visualization__select-error');
    expect(errorDiv.props().style.transform).toBe('scaleY(1)');
    expect(errorDiv.text()).toBe('Test error');
  });

  test('Click upload button calls handleFile prop', () => {
    const wrapper = shallow(
      <Selection
        err=""
        handleFile={handleFile}
      />,
    );
    const uploadButton = wrapper.find('Upload');
    uploadButton.simulate('change');
    expect(handleFile).toHaveBeenCalledTimes(1);

    // beforeUpload should return false;
    expect(uploadButton.props().beforeUpload()).toBeFalsy();
  });
});
