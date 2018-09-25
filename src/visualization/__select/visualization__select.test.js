import React from 'react';
import { shallow } from 'enzyme';

import Selection from './visualization__select';

jest.mock('../browser-session/browser-session');

const handleFile = jest.fn();

describe('Selection', () => {
  test('should display default view', () => {
    const wrapper = shallow(
      <Selection
        err=""
        loading={false}
        handleFile={handleFile}
      />,
    );
    expect(wrapper).toMatchSnapshot();

    // The error element should not be visible (scale = 0).
    const errorDiv = wrapper.find('.visualization__select-error');
    expect(errorDiv.props().style.transform).toBe('scaleY(0)');

    // The loading message should not be rendered.
    const loadingDiv = wrapper.find('.visualization__select-loading');
    expect(loadingDiv.props().style.transform).toBe('scaleY(0)');
  });

  test('should display an error', () => {
    const wrapper = shallow(
      <Selection
        err="Test error"
        loading={false}
        handleFile={handleFile}
      />,
    );
    expect(wrapper).toMatchSnapshot();

    // The error element should be visible (scale = 1) and display text.
    const errorDiv = wrapper.find('.visualization__select-error');
    expect(errorDiv.props().style.transform).toBe('scaleY(1)');
    expect(errorDiv.text()).toBe('Test error');
  });

  test('should display loading message', () => {
    const wrapper = shallow(
      <Selection
        err=""
        loading
        handleFile={handleFile}
      />,
    );
    expect(wrapper).toMatchSnapshot();

    // The loading element should be visible (scale = 1).
    const loadingDiv = wrapper.find('.visualization__select-loading');
    expect(loadingDiv.props().style.transform).toBe('scaleY(1)');
  });

  test('should call handleFile prop on button click', () => {
    const wrapper = shallow(
      <Selection
        err=""
        loading={false}
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
