import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import indexedDBDelete from './indexeddb-delete';
import indexedDBGet from './indexeddb-get';
import indexedDBGetAll from './indexeddb-getall';
import indexedDBSave from './indexeddb-save';
import indexedDBSupport from './indexeddb-support';
import Notification from './notification';
import saveSelector from '../../state/selectors/visualization/save-selector';
import sessionState from '../session/session-state';

const PAGELENGTH = 5;

export class IndexedDBContainer extends Component {
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
    const saveState = sessionState(name);
    indexedDBSave(saveState)
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
    return this.props.render({
      changePage: this.changePage,
      deleteSession: this.deleteSession,
      openSession: this.openSession,
      saveSessionBrowser: this.saveSessionBrowser,
      sessionItemsTotal: this.state.sessions.length,
      sessions: this.state.sessionsPageArr,
      sessionsPage: this.state.sessionsPage,
      storageSupport: this.state.storageSupport,
    });
  }
}

IndexedDBContainer.propTypes = {
  render: PropTypes.func.isRequired,
  save: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  save: saveSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(IndexedDBContainer);

export default ConnectedContainer;
