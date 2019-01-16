import React from 'react';
import { shallow } from 'enzyme';

import FileInput from './file-input';

const onFileChange = jest.fn();
const selectSampleFile = jest.fn();

describe('FileInput', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <FileInput
        onFileChange={onFileChange}
        selectSampleFile={selectSampleFile}
      />,
    );
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call selectSampleFile on click', () => {
    const button = wrapper.find('button');
    button.simulate('click');
    expect(selectSampleFile).toHaveBeenCalledTimes(1);
  });
});
