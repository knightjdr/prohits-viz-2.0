import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import download from '../../../../helpers/download';
import getFile from './get-file/get-file';
import indexedDBDelete from './browser-storage/indexeddb-delete';
import indexedDBGet from './browser-storage/indexeddb-get';
import indexedDBGetAll from './browser-storage/indexeddb-getall';
import indexedDBSave from './browser-storage/indexeddb-save';
import indexedDBSupport from './browser-storage/indexeddb-support';
import Notification from './browser-storage/notification';
import Save from './panel__save';
import saveSelector from '../../../../state/selectors/visualization/save-selector';
import { saveImage } from '../../../../state/post/save-image-thunk';
import { saveImageType, saveSessionName } from '../../../../state/set/visualization/save-actions';

const PAGELENGTH = 5;

export class SaveContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      sessionsPage: 1,
      sessionsPageArr: [],
      storageSupport: indexedDBSupport(),
    };
  }
  componentWillMount = () => {
    // Check for saved sessions.
    indexedDBGetAll().then((sessions) => {
      this.setState({
        sessions,
        sessionsPageArr: sessions.slice(0, PAGELENGTH),
      });
    });
  }
  componentWillReceiveProps = (nextProps) => {
    const { save } = nextProps;
    this.downloadImage(save, this.props.save);
  }
  archive = () => {}
  changePage = (page) => {
    const startIndex = (page - 1) * PAGELENGTH;
    this.setState(({ sessions }) => ({
      sessionsPage: page,
      sessionsPageArr: sessions.slice(startIndex, startIndex + PAGELENGTH),
    }));
  }
  deleteSession = (id, name) => {
    indexedDBDelete(id)
      .then(() => {
        Notification(`Session '${name}' was deleted.`, true);
        return indexedDBGetAll();
      })
      .then((sessions) => {
        this.setState(({ sessionsPage }) => {
          const updatedPage = this.updatePage(sessions, sessionsPage);
          return {
            sessions,
            sessionsPage: updatedPage.sessionsPage,
            sessionsPageArr: updatedPage.sessionsPageArr,
          };
        });
      })
      .catch(() => {
        Notification(`Session '${name}' could not be deleted.`, false);
      });
  }
  downloadImage = (save, prevSave) => {
    if (
      save.didSave &&
      save.didSave !== prevSave.didSave &&
      save.task
    ) {
      getFile(save.task);
    }
  }
  openSession = (id, name) => {
    indexedDBGet(id)
      .then(() => {
        Notification(`Session '${name}' was loaded.`, true);
      })
      .catch(() => {
        Notification(`Session '${name}' could not be loaded.`, false);
      });
  }
  saveSessionBrowser = () => {
    const name = this.props.save.name || 'unnamed session';
    indexedDBSave({ date: new Date(), name })
      .then(() => {
        Notification(`Session '${name}' was saved.`, true);
        return indexedDBGetAll();
      })
      .then((sessions) => {
        this.setState(({ sessionsPage }) => {
          const updatedPage = this.updatePage(sessions, sessionsPage);
          return {
            sessions,
            sessionsPage: updatedPage.sessionsPage,
            sessionsPageArr: updatedPage.sessionsPageArr,
          };
        });
      })
      .catch(() => {
        Notification(`Session '${name}' could not be saved.`, false);
      });
  }
  saveSessionFile = () => {
    const name = this.props.save.name ? `${this.props.save.name}.json` : 'prohits-viz-session.json';
    download(JSON.stringify({}), name, 'application/json');
  }
  updatePage = (sessions, sessionsPage) => {
    const page = sessions.length > (sessionsPage - 1) * PAGELENGTH ?
      sessionsPage
      :
      sessionsPage - 1;
    const startIndex = (page - 1) * PAGELENGTH;
    return {
      sessionsPage: page,
      sessionsPageArr: sessions.slice(startIndex, startIndex + PAGELENGTH),
    };
  }
  render() {
    return (
      <Save
        archive={this.archive}
        changePage={this.changePage}
        deleteSession={this.deleteSession}
        handleImageType={this.props.saveImageType}
        imageType={this.props.save.imageType}
        isSaving={this.props.save.isSaving}
        openSession={this.openSession}
        saveError={this.props.save.error}
        saveImage={this.props.saveImage}
        saveSessionBrowser={this.saveSessionBrowser}
        saveSessionFile={this.saveSessionFile}
        saveSessionName={this.props.saveSessionName}
        sessionItemsTotal={this.state.sessions.length}
        sessionName={this.props.save.name}
        sessions={this.state.sessionsPageArr}
        sessionsPage={this.state.sessionsPage}
        storageSupport={this.state.storageSupport}
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
  saveImage: PropTypes.func.isRequired,
  saveImageType: PropTypes.func.isRequired,
  saveSessionName: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  save: saveSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
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
