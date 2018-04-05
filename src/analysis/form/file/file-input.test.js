import React from 'react';
import { shallow } from 'enzyme';

import FileInput from './file-input';

const onFileChange = jest.fn();
const selectSampleFile = jest.fn();

describe('FileInput', () => {
  test('Renders', () => {
    const wrapper = shallow(
      <FileInput
        onFileChange={onFileChange}
        selectSampleFile={selectSampleFile}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Use sample button call selectSampleFile function', () => {
    const wrapper = shallow(
      <FileInput
        onFileChange={onFileChange}
        selectSampleFile={selectSampleFile}
      />,
    );
    const button = wrapper.find('button');
    button.simulate('click');
    expect(selectSampleFile).toHaveBeenCalledTimes(1);
  });
});
