import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import InteractiveFileSelector from '../../state/selectors/interactive-file-selector';
import SelectType from './visualization__select-type';
import ValidateJson from './visualization__select-validate';
import { setIntFile } from '../../state/set/interactive-file-actions';

/* SelectContainer handles user uploads for interactive images, including
** file validation. */
export class SelectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      vizType: 'heatmap', // this.setVizType(this.props.interactiveFile),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { interactiveFile } = nextProps;
    if (interactiveFile) {
      this.setState({
        vizType: this.setVizType(interactiveFile),
      });
    }
  }
  onFileLoad = (string) => {
    const json = ValidateJson(string);
    if (json.err) {
      this.setState({
        err: json.message,
      });
    } else {
      this.setState({
        err: null,
      });
      this.props.setFile(json.json);
    }
  }
  setVizType = (file) => {
    if (!file) {
      return null;
    } else if (
      file.params.imageType === 'dotplot' ||
      file.params.imageType === 'heatmap'
    ) {
      return 'heatmap';
    } else if (file.params.imageType === 'scatter') {
      return 'scatter';
    }
    return null;
  }
  handleFile = file => (
    new Promise((resolve) => {
      /* The fileList property is an array of max length 1 that will contain the
      ** file to upload. */
      if (
        file &&
        file.fileList &&
        file.fileList.length > 0
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          this.onFileLoad(reader.result);
          resolve();
        };
        reader.readAsText(file.fileList[0]);
      } else {
        this.setState({
          err: null,
        });
        resolve();
      }
    })
  )
  render() {
    return (
      <SelectType
        err={this.state.err}
        handleFile={this.handleFile}
        vizType={this.state.vizType}
      />
    );
  }
}

SelectContainer.defaultProps = {
  interactiveFile: null,
};

SelectContainer.propTypes = {
  interactiveFile: PropTypes.shape({
    params: PropTypes.shape({
      imageType: PropTypes.string,
    }),
  }),
  setFile: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  setFile: (file) => {
    dispatch(setIntFile(file));
  },
});

/* istanbul ignore next */
const mapStateToProps = state => ({
  interactiveFile: InteractiveFileSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectContainer);

export default ConnectedContainer;
