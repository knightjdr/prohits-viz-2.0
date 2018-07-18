import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Download from '../../download/download';
import IndexedDBDelete from './browser-storage/indexeddb-delete';
import IndexedDBGet from './browser-storage/indexeddb-get';
import IndexedDBGetall from './browser-storage/indexeddb-getall';
import IndexedDBSave from './browser-storage/indexeddb-save';
import IndexedDBSupport from './browser-storage/indexeddb-support';
import Notification from './browser-storage/notification';
import Save from './panel__save';
import SaveSelector from '../../../../state/selectors/visualization/save-selector';
import { saveImageType, saveSessionName } from '../../../../state/set/visualization/save-actions';

export class SaveContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      sessionsPage: 1,
      sessionsPageArr: [],
      storageSupport: IndexedDBSupport(),
    };
  }
  componentDidMount = () => {
    // Check for saved sessions.
    IndexedDBGetall().then((sessions) => {
      this.setState({
        sessions,
        sessionsPageArr: sessions.slice(0, 5),
      });
    });
  }
  archive = () => {
    console.log('archive');
  }
  changePage = (page) => {
    const startIndex = (page - 1) * 5;
    this.setState(({ sessions }) => ({
      sessionsPage: page,
      sessionsPageArr: sessions.slice(startIndex, startIndex + 5),
    }));
  }
  deleteSession = (id, name) => {
    IndexedDBDelete(id)
      .then(() => {
        Notification(`Session '${name}' was deleted.`, true);
        return IndexedDBGetall();
      })
      .then((sessions) => {
        this.setState({ sessions });
      })
      .catch(() => {
        Notification(`Session '${name}' could not be deleted.`, false);
      });
  }
  openSession = (id, name) => {
    IndexedDBGet(id)
      .then(() => {
        Notification(`Session '${name}' was loaded.`, true);
      })
      .catch(() => {
        Notification(`Session '${name}' could not be loaded.`, false);
      });
  }
  saveImage = () => {
    console.log('save image');
  }
  saveSessionBrowser = () => {
    const name = this.props.save.name || 'unnamed session';
    IndexedDBSave({ date: new Date(), name })
      .then(() => {
        Notification(`Session '${name}' was saved.`, true);
        return IndexedDBGetall();
      })
      .then((sessions) => {
        this.setState({ sessions });
      })
      .catch(() => {
        Notification(`Session '${name}' could not be saved.`, false);
      });
  }
  saveSessionFile = () => {
    const name = `${this.props.save.name}.json` || 'prohits-viz-session.json';
    Download(JSON.stringify({}), name, 'application/json');
  }
  render() {
    return (
      <Save
        archive={this.archive}
        changePage={this.changePage}
        deleteSession={this.deleteSession}
        handleImageType={this.props.saveImageType}
        imageType={this.props.save.imageType}
        openSession={this.openSession}
        saveImage={this.saveImage}
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
