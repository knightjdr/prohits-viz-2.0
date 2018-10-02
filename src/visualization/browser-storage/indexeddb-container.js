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
import { parseFile } from '../../state/set/interactive-file-actions';

const PAGELENGTH = 5;

export class IndexedDBContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionItemsTotal: 0,
      sessions: [],
      sessionsPage: [],
      sessionsPageNumber: 1,
      storageSupport: indexedDBSupport(),
    };
  }
  componentWillMount = () => {
    // Check for saved sessions.
    indexedDBGetAll().then((sessions) => {
      this.setState({
        sessionItemsTotal: sessions.length,
        sessions,
        sessionsPage: sessions.slice(0, PAGELENGTH),
      });
    });
  }
  componentDidMount = () => {
    window.addEventListener('indexeddb-update', this.updateSessions);
  }
  componentWillUnmount = () => {
    window.removeEventListener('indexeddb-update', this.updateSessions);
  }
  changePage = (page) => {
    const startIndex = (page - 1) * PAGELENGTH;
    this.setState(({ sessions }) => ({
      sessionsPage: sessions.slice(startIndex, startIndex + PAGELENGTH),
      sessionsPageNumber: page,
    }));
  }
  deleteSession = (id, name) => {
    indexedDBDelete(id)
      .then(() => {
        Notification(`Session '${name}' was deleted.`, true);
      })
      .catch(() => {
        Notification(`Session '${name}' could not be deleted.`, false);
      });
  }
  openSession = (id, name) => {
    indexedDBGet(id)
      .then((session) => {
        this.props.parseFile(session);
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
      })
      .catch(() => {
        Notification(`Session '${name}' could not be saved.`, false);
      });
  }
  updatePage = (sessions, sessionsPageNumber) => {
    const page = sessions.length > (sessionsPageNumber - 1) * PAGELENGTH ?
      sessionsPageNumber
      :
      sessionsPageNumber - 1;
    const startIndex = (page - 1) * PAGELENGTH;
    return {
      sessionsPage: sessions.slice(startIndex, startIndex + PAGELENGTH),
      sessionsPageNumber: page,
    };
  }
  updateSessions = () => {
    indexedDBGetAll()
      .then((sessions) => {
        this.setState(({ sessionsPageNumber }) => {
          const updatedPage = this.updatePage(sessions, sessionsPageNumber);
          return {
            sessionItemsTotal: sessions.length,
            sessions,
            sessionsPage: updatedPage.sessionsPage,
            sessionsPageNumber: updatedPage.sessionsPageNumber,
          };
        });
      });
  };
  render() {
    return this.props.render({
      changePage: this.changePage,
      deleteSession: this.deleteSession,
      openSession: this.openSession,
      saveSessionBrowser: this.saveSessionBrowser,
      sessionItemsTotal: this.state.sessionItemsTotal,
      sessions: this.state.sessions,
      sessionsPage: this.state.sessionsPage,
      sessionsPageNumber: this.state.sessionsPageNumber,
      storageSupport: this.state.storageSupport,
    });
  }
}

IndexedDBContainer.propTypes = {
  parseFile: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  save: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  save: saveSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  parseFile: (file) => {
    dispatch(parseFile(file));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexedDBContainer);

export default ConnectedContainer;
