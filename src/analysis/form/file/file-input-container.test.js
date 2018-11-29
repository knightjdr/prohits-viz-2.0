import deepEqual from 'deep-equal';
import React from 'react';
import { shallow } from 'enzyme';

import ParseHeader from './parse-header';
import { FileInputContainer, SampleHeader } from './file-input-container';
import { clearFileHeader, setFileHeader } from '../../../state/set/form/header-actions';

jest.mock('deep-equal');

jest.mock('./parse-header');
ParseHeader.mockReturnValue(Promise.resolve(SampleHeader));

jest.mock('../../../state/set/form/header-actions');
const change = jest.fn();

const newFile = { originFileObj: new File([SampleHeader], 'newfile.txt', { type: 'text/plain' }) };
newFile.uid = 'rc-upload-newFile';
const sampleFile = { originFileObj: new File([SampleHeader], 'samplefile.txt', { type: 'text/plain' }) };
sampleFile.uid = 'rc-upload-sampleFile';

describe('FileInputContainer', () => {
  it('should render initially', () => {
    const wrapper = shallow(
      <FileInputContainer
        change={change}
        clearFileHeader={clearFileHeader}
        setFileHeader={setFileHeader}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onFileChange with empty file array', () => {
    const wrapper = shallow(
      <FileInputContainer
        change={change}
        clearFileHeader={clearFileHeader}
        setFileHeader={setFileHeader}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().onFileChange(
      { fileList: [] },
      { value: [] },
    );
    // clear the store header
    expect(clearFileHeader).toHaveBeenCalledTimes(1);
    // do no update header (we just cleared it)
    expect(setFileHeader).not.toHaveBeenCalled();
    // set the sample file checkbox field to false
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('sampleFile', false);
    // if no file from the field, store value should be set to null
    expect(change).toHaveBeenCalledWith('file', []);
  });

  it('should call onFileChange with undefined file array', () => {
    const wrapper = shallow(
      <FileInputContainer
        change={change}
        clearFileHeader={clearFileHeader}
        setFileHeader={setFileHeader}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().onFileChange(
      { fileList: undefined },
      { value: [] },
    );
    // clear the store header
    expect(clearFileHeader).toHaveBeenCalledTimes(1);
    // do no update header (we just cleared it)
    expect(setFileHeader).not.toHaveBeenCalled();
    // set the sample file checkbox field to false
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('sampleFile', false);
    // if no file from the field, store value should be set to null
    expect(change).toHaveBeenCalledWith('file', []);
  });

  it('should call onFileChange with a new file and no stored file', () => {
    deepEqual.mockReturnValueOnce(false);
    const wrapper = shallow(
      <FileInputContainer
        change={change}
        clearFileHeader={clearFileHeader}
        setFileHeader={setFileHeader}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().onFileChange(
      { fileList: [newFile] },
      { value: [] },
    );
    // update header
    expect(ParseHeader).toHaveBeenCalledWith(newFile.originFileObj);
    // update store with new file
    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith('file', [newFile]);
  });

  it('should call onFileChange with a new file the same as the stored file', () => {
    deepEqual.mockReturnValueOnce(true);
    const wrapper = shallow(
      <FileInputContainer
        change={change}
        clearFileHeader={clearFileHeader}
        setFileHeader={setFileHeader}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().onFileChange(
      { fileList: [newFile] },
      { value: [newFile] },
    );
    // update header
    expect(setFileHeader).not.toHaveBeenCalled();
    // update store with new file
    expect(change).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith('file', [newFile]);
  });

  it('should call onFileChange with a new file and current stored file is sample file', () => {
    deepEqual.mockReturnValueOnce(false);
    const wrapper = shallow(
      <FileInputContainer
        change={change}
        clearFileHeader={clearFileHeader}
        setFileHeader={setFileHeader}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().onFileChange(
      { fileList: [newFile, sampleFile] },
      { value: [sampleFile] },
    );
    // update header
    expect(ParseHeader).toHaveBeenCalledWith(newFile.originFileObj);
    // set the sample file checkbox field to false
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('sampleFile', false);
    // update store with new file
    expect(change).toHaveBeenCalledWith('file', [newFile]);
  });

  it('should selectSampleFile', () => {
    const wrapper = shallow(
      <FileInputContainer
        change={change}
        clearFileHeader={clearFileHeader}
        setFileHeader={setFileHeader}
      />,
    );
    jest.clearAllMocks();
    wrapper.instance().onFileChange = jest.fn();
    wrapper.update();
    wrapper.instance().selectSampleFile();
    // set the sample file checkbox field to false
    expect(change).toHaveBeenCalledTimes(2);
    expect(change).toHaveBeenCalledWith('fileType', 'saint');
    expect(change).toHaveBeenCalledWith('sampleFile', true);
    // on file change called with sample file
    expect(wrapper.instance().onFileChange).toHaveBeenCalled();
    // restore mock
    wrapper.instance().onFileChange.mockRestore();
    wrapper.update();
  });
});
