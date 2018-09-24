import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import download from '../../../../helpers/download';
import getFile from '../../../../helpers/get-file';
import Save from './panel__save';
import saveSelector from '../../../../state/selectors/visualization/save-selector';
import sessionState from '../../../session/session-state';
import { saveError } from '../../../../state/post/save-image/save-actions';
import saveImage from '../../../../state/post/save-image/save-thunk';
import { saveImageType, saveSessionName } from '../../../../state/set/visualization/save-actions';

export class SaveContainer extends PureComponent {
  componentWillReceiveProps = (nextProps) => {
    const { save } = nextProps;
    this.downloadImage(save, this.props.save);
  }
  archive = () => {}
  downloadImage = (save, prevSave) => {
    if (
      save.didSave &&
      save.didSave !== prevSave.didSave &&
      save.task
    ) {
      const options = {
        err: this.props.saveError,
        ext: save.imageType,
        name: 'image',
      };
      getFile(`file/${save.task}`, options);
    }
  }
  saveSessionFile = () => {
    const name = this.props.save.name ? `${this.props.save.name}.json` : 'prohits-viz-session.json';
    const saveState = sessionState(name);
    download(JSON.stringify(saveState, null, 2), name, 'application/json');
  }
  saveSessionName = (e) => {
    this.props.saveSessionName(e.target.value);
  }
  render() {
    return (
      <Save
        archive={this.archive}
        handleImageType={this.props.saveImageType}
        imageType={this.props.save.imageType}
        isSaving={this.props.save.isSaving}
        saveError={this.props.save.error}
        saveImage={this.props.saveImage}
        saveSessionBrowser={this.props.saveSessionBrowser}
        saveSessionFile={this.saveSessionFile}
        saveSessionName={this.saveSessionName}
        sessionName={this.props.save.name}
        storageSupport={this.props.storageSupport}
      />
    );
  }
}

SaveContainer.propTypes = {
  save: PropTypes.shape({
    didSave: PropTypes.bool,
    error: PropTypes.bool,
    imageType: PropTypes.string,
    isSaving: PropTypes.bool,
    name: PropTypes.string,
    task: PropTypes.string,
  }).isRequired,
  saveError: PropTypes.func.isRequired,
  saveImage: PropTypes.func.isRequired,
  saveImageType: PropTypes.func.isRequired,
  saveSessionBrowser: PropTypes.func.isRequired,
  saveSessionName: PropTypes.func.isRequired,
  storageSupport: PropTypes.bool.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  save: saveSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  saveError: () => {
    dispatch(saveError());
  },
  saveImage: () => {
    dispatch(saveImage());
  },
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
