import deepEqual from 'deep-equal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FileInput from './file-input';
import ParseHeader from './parse-header';
import { clearFileHeader, setFileHeader } from '../../../state/set/form/header-actions';

export const SampleHeader = 'Bait\tPrey\tPreyGene\tSpec\tSpecSum\tAvgSpec\tNumReplicates\tctrlCounts\tAvgP\tMaxP\tTopoAvgP\tTopoMaxP\tSaintScore\tlogOddsScore\tFoldChange\tBFDR\tUniqueSpec\tUniqueSpecSum\tUniqueAvgSpec\tPreySequenceLength\n';

export class FileInputContainer extends Component {
  onFileChange = (value, input) => {
    // If there are no files, clear header field in store and ensure sampleFile = false.
    if (
      !value.fileList ||
      value.fileList.length === 0
    ) {
      this.props.clearFileHeader();
      this.props.change('sampleFile', false);
    } else if ( // if first file has changed, update header in store
      !deepEqual(input.value[0], value.fileList[0])
    ) {
      ParseHeader(value.fileList[0].originFileObj)
        .then((header) => {
          this.props.setFileHeader(header);
        });
    }
    // Prevent sample file from being run with other files.
    const newValue = value.fileList || []; // default
    if (
      newValue.length > 1 &&
      newValue.some(file => file.uid === 'rc-upload-sampleFile')
    ) {
      const index = newValue.map(file => file.uid).indexOf('rc-upload-sampleFile');
      newValue.splice(index, 1);
      this.props.change('sampleFile', false);
    }
    // update redux store with file list
    this.props.change('file', newValue);
  }
  selectSampleFile = () => {
    const sampleFile = new File([SampleHeader], 'samplefile.txt', { type: 'text/plain' });
    sampleFile.uid = 'rc-upload-sampleFile';
    const sampleObj = {
      file: sampleFile,
      fileList: [{
        name: 'samplefile.txt',
        originFileObj: sampleFile,
        uid: sampleFile.uid,
      }],
    };
    this.props.change('fileType', 'saint');
    this.props.change('sampleFile', true);
    this.onFileChange(
      sampleObj,
      {
        value: [],
      },
    );
  }
  render() {
    return (
      <FileInput
        onFileChange={this.onFileChange}
        selectSampleFile={this.selectSampleFile}
      />
    );
  }
}

FileInputContainer.propTypes = {
  change: PropTypes.func.isRequired,
  clearFileHeader: PropTypes.func.isRequired,
  setFileHeader: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearFileHeader: () => {
    dispatch(clearFileHeader());
  },
  setFileHeader: (header) => {
    dispatch(setFileHeader(header));
  },
});

const ConnectedContainer = connect(
  null,
  mapDispatchToProps,
)(FileInputContainer);

export default ConnectedContainer;
