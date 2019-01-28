import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getFile from '../helpers/get-file';
import getTaskStatus from '../state/post/task-thunk';
import sessionSelector from '../state/selectors/session-selector';
import Tasks from './tasks';
import taskSelector from '../state/selectors/task-selector';
import { arrayShallowEqual } from '../helpers/array-shallow-equal';

const txtFiles = ['error', 'log'];

export class TaskContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalContent: null,
      modalTitle: null,
      openModal: false,
      selectedFiles: {},
    };
  }
  componentDidUpdate = (prevProps) => {
    const { session, tasks } = prevProps;
    this.fetchTasks(this.props.session, session);
    this.updateTasks(this.props.tasks, tasks);
  }
  getError = () => {
    this.setState({
      modalContent: 'There was an error retrieving this file/folder',
      modalTitle: 'Error',
      openModal: true,
    });
  }
  changeFile = (task, value) => {
    this.setState(({ selectedFiles }) => ({
      selectedFiles: {
        ...selectedFiles,
        [task]: value,
      },
    }));
  }
  closeModal = () => {
    this.setState({
      modalContent: null,
      modalTitle: null,
      openModal: false,
    });
  }
  downloadFolder = (id) => {
    const options = {
      err: this.getError,
      ext: 'zip',
      name: id,
    };
    getFile(`task/${id}`, options);
  }
  fetchTasks = (session, prevSession) => {
    if (
      session
      && session !== prevSession
    ) {
      const { fetchTaskStatus, id } = this.props;
      fetchTaskStatus(id);
    }
  }
  openModal = id => (text) => {
    this.showText(text, id);
  }
  showText = (text, id) => {
    this.setState({
      modalContent: text,
      modalTitle: `Task: ${id}`,
      openModal: true,
    });
  }
  updateTasks = (tasks, prevTasks) => {
    if (
      !arrayShallowEqual(tasks.list, prevTasks.list) ||
      tasks.shouldUpdate
    ) {
      const { fetchTaskStatus, id } = this.props;
      fetchTaskStatus(id);
    }
  }
  viewFile = (id) => {
    const selectedtask = this.props.tasks.status.find(task => task.id === id);
    const selectedFile = this.state.selectedFiles[id] || selectedtask.primaryFile;
    if (
      selectedFile
      && txtFiles.includes(selectedFile)
    ) {
      const options = {
        err: this.getError,
        responseType: 'text',
      };
      getFile(`task/${id}/${selectedFile}`, options, this.openModal(id));
    } else if (selectedFile) {
      this.props.history.push(`/visualization/${id}/${selectedFile}`);
    }
  }
  render() {
    const missing = Boolean(this.props.id && !this.props.tasks.list.includes(this.props.id));
    let tasks;
    if (missing) {
      tasks = [];
    } else if (this.props.id) {
      tasks = [this.props.tasks.status.find(task => task.id === this.props.id)];
    } else {
      tasks = this.props.tasks.status;
    }
    return (
      <Tasks
        changeFile={this.changeFile}
        closeModal={this.closeModal}
        downloadFolder={this.downloadFolder}
        error={this.props.tasks.didError}
        id={this.props.id}
        isUpdating={this.props.tasks.isUpdating}
        missing={missing}
        modalContent={this.state.modalContent}
        modalTitle={this.state.modalTitle}
        navbar={this.props.navbar}
        openModal={this.state.openModal}
        selectedFiles={this.state.selectedFiles}
        tasks={tasks}
        refreshStatus={this.fetchTasks}
        viewFile={this.viewFile}
      />
    );
  }
}

TaskContainer.defaultProps = {
  id: null,
  navbar: true,
  session: '',
};

TaskContainer.propTypes = {
  fetchTaskStatus: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  id: PropTypes.string,
  navbar: PropTypes.bool,
  session: PropTypes.string,
  tasks: PropTypes.shape({
    didError: PropTypes.bool,
    isUpdating: PropTypes.bool,
    list: PropTypes.arrayOf(
      PropTypes.string,
    ),
    shouldUpdate: PropTypes.bool,
    status: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  session: sessionSelector(state),
  tasks: taskSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchTaskStatus: (id) => {
    dispatch(getTaskStatus(id));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskContainer);

export default withRouter(ConnectedContainer);
