import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FillJson from './fill/fill';
import ParamSelector from '../../state/selectors/visualization/params-selector';
import SelectType from './visualization__select-type';
import ValidateJson from './visualization__select-validate';
import { parseFile } from '../../state/set/interactive-file-actions';

/* SelectContainer handles user uploads for interactive images, including
** file validation. */
export class SelectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      vizType: this.props.params.imageType,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { params } = nextProps;
    if (params.imageType !== this.props.params.imageType) {
      this.setState({ vizType: params.imageType });
    }
  }
  onFileLoad = (name, string) => {
    const json = ValidateJson(string);
    if (json.err) {
      this.setState({ err: json.message });
    } else {
      this.setState({ err: null });
      const file = FillJson(name, json.json);
      this.props.parseFile(file);
    }
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
          this.onFileLoad(file.fileList[0].originFileObj.name, reader.result);
          resolve();
        };
        reader.readAsText(file.fileList[0].originFileObj);
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

SelectContainer.propTypes = {
  params: PropTypes.shape({
    imageType: PropTypes.string,
  }).isRequired,
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
  params: ParamSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectContainer);

export default ConnectedContainer;
