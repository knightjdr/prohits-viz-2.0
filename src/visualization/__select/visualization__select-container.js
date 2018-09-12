import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FillJson from './fill/fill';
import SelectType from './visualization__select-type';
import ValidateJson from './visualization__select-validate';
import { parameterSelectorProp } from '../../state/selectors/visualization/params-selector';
import { parseFile } from '../../state/set/interactive-file-actions';

/* SelectContainer handles user uploads for interactive images, including
** file validation. */
export class SelectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      loading: false,
      vizType: this.props.imageType,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { imageType } = nextProps;
    if (imageType !== this.props.imageType) {
      this.changeVizType(imageType, this.props.imageType);
    }
  }
  onFileLoad = (name, string) => {
    const json = ValidateJson(string);
    if (json.err) {
      this.setState({
        err: json.message,
        loading: false,
      });
    } else {
      const file = FillJson(name, json.json);
      this.props.parseFile(file);
      this.setState({
        err: null,
        loading: false,
      });
    }
  }
  changeVizType = (nextType) => {
    this.setState({ vizType: nextType });
  }
  /* This is a promise to make unit testing easier. */
  handleFile = (file) => {
    this.setState({ loading: true });
    return (
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
            this.onFileLoad(file.fileList[0].originFileObj.name, reader.result);
            resolve();
          };
          reader.readAsText(file.fileList[0].originFileObj);
        } else {
          this.setState({
            err: null,
            loading: false,
          });
          resolve();
        }
      })
    );
  }
  render() {
    return (
      <SelectType
        err={this.state.err}
        handleFile={this.handleFile}
        loading={this.state.loading}
        vizType={this.state.vizType}
      />
    );
  }
}

SelectContainer.defaultProps = {
  imageType: null,
};

SelectContainer.propTypes = {
  imageType: PropTypes.string,
  parseFile: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  parseFile: (file) => {
    dispatch(parseFile(file));
  },
});

/* istanbul ignore next */
const mapStateToProps = state => ({
  imageType: parameterSelectorProp(state, 'imageType'),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectContainer);

export default ConnectedContainer;
