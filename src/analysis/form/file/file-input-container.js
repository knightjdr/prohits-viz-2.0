import deepEqual from 'deep-equal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FileInput from './file-input';
import ParseHeader from './parse-header';
import { clearFileHeader, setFileHeader } from '../../../state/set/header-actions';

const SampleHeader = 'Bait\tPrey\tPreyGene\tSpec\tSpecSum\tAvgSpec\tNumReplicates\tctrlCounts\tAvgP\tMaxP\tTopoAvgP\tTopoMaxP\tSaintScore\tlogOddsScore\tFoldChange\tBFDR\tboosted_by\tUniqueSpec\tUniqueSpecSum\tUniqueAvgSpec\tPreySequenceLength\n';

export class FileInputContainer extends Component {
  onClickSample = () => {
    const sampleFile = new File([SampleHeader], 'samplefile.txt', { type: 'text/plain' });
    sampleFile.uid = 'rc-upload-sampleFile';
    const sampleObj = {
      file: sampleFile,
      fileList: [sampleFile],
    };
    this.props.change('fileType', 'saint');
    this.props.change('sampleFile', true);
    this.onFileChange(
      sampleObj,
      {
        onChange: (value) => { this.props.change('file', value); },
        value: [],
      },
    );
  }
  onFileChange = (value, input) => {
    // if there are no files, clear header field in store and ensure sampleFile = false
    if (value.fileList.length === 0) {
      this.props.clearFileHeader();
      this.props.change('sampleFile', false);
    } else if ( // if first file has changed, update header in store
      !deepEqual(input.value[0], value.fileList[0])
    ) {
      ParseHeader(value.fileList[0])
        .then((header) => {
          this.props.setFileHeader(header);
        });
    }
    // if the current file is the sample file remove it from new file list
    let newValue = value.fileList || []; // default
    if (
      newValue.length > 1 &&
      input.value.length === 1 &&
      input.value[0].uid === 'rc-upload-sampleFile'
    ) {
      newValue = newValue.slice(0, newValue.length - 1);
      this.props.change('sampleFile', false);
    }
    // update redux store with file list
    input.onChange(newValue);
  }
  render() {
    return (
      <FileInput
        getFieldDecorator={this.props.getFieldDecorator}
        onClickSample={this.onClickSample}
        onFileChange={this.onFileChange}
      />
    );
  }
}

FileInputContainer.propTypes = {
  change: PropTypes.func.isRequired,
  clearFileHeader: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
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
