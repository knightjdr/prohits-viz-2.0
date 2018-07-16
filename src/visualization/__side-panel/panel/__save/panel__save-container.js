import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Save from './panel__save';
import SaveSelector from '../../../../state/selectors/visualization/save-selector';
import { saveImageType, saveSessionName } from '../../../../state/set/visualization/save-actions';

export class SaveContainer extends Component {
  archive = () => {
    console.log('archive');
  }
  saveImage = () => {
    console.log('save image');
  }
  saveSessionBrowser = () => {
    console.log('save session browser');
  }
  saveSessionFile = () => {
    console.log('save session file');
  }
  render() {
    return (
      <Save
        archive={this.archive}
        handleImageType={this.props.saveImageType}
        imageType={this.props.save.imageType}
        saveImage={this.saveImage}
        saveSessionBrowser={this.saveSessionBrowser}
        saveSessionFile={this.saveSessionFile}
        saveSessionName={this.props.saveSessionName}
        sessionName={this.props.save.name}
      />
    );
  }
}

SaveContainer.propTypes = {
  save: PropTypes.shape({
    imageType: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  saveImageType: PropTypes.func.isRequired,
  saveSessionName: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  save: SaveSelector(state),
});

const mapDispatchToProps = dispatch => ({
  saveImageType: (imageType) => {
    dispatch(saveImageType(imageType));
  },
  saveSessionName: (name) => {
    dispatch(saveSessionName(name));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaveContainer);

export default ConnectedContainer;
