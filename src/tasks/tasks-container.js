import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getFile from '../helpers/get-file';
import getTaskStatus from '../state/post/task-thunk';
import Tasks from './tasks';
import taskSelector from '../state/selectors/task-selector';
import { arrayShallowEqual } from '../helpers/array-shallow-equal';

const txtFiles = ['error', 'log'];

export class TaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalContent: null,
      modalTitle: null,
      openModal: false,
    };
  }
  componentDidMount = () => {
    this.fetchTasks();
  }
  componentWillReceiveProps = (nextProps) => {
    const { tasks } = nextProps;
    this.updateTasks(tasks, this.props.tasks);
  }
  getError = () => {
    this.setState({
      modalContent: 'There was an error retrieving this file/folder',
      modalTitle: 'Error',
      openModal: true,
    });
  }
  changeFile = (task, value) => {
    this.selectFiles[task] = value;
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
  fetchTasks = () => {
    const { fetchTaskStatus, id } = this.props;
    fetchTaskStatus(id);
  }
  showText = (text, id) => {
    this.setState({
      modalContent: text,
      modalTitle: `Task: ${id}`,
      openModal: true,
    });
  }
  selectFiles = {}
  updateTasks = (tasks, prevTasks) => {
    if (
      !arrayShallowEqual(tasks.list, prevTasks.list) ||
      tasks.shouldUpdate
    ) {
      this.fetchTasks();
    }
  }
  viewFile = (id) => {
    if (
      this.selectFiles[id] &&
      txtFiles.includes(this.selectFiles[id])
    ) {
      const viewFile = (text) => {
        this.showText(text, id);
      };
      const options = {
        err: this.getError,
        responseType: 'text',
      };
      getFile(`task/${id}/${this.selectFiles[id]}`, options, viewFile);
    } else if (this.selectFiles[id]) {
      this.props.history.push(`/visualization/${id}/${this.selectFiles[id]}`);
    }
  }
  render() {
    const missing = this.props.id && !this.props.tasks.list.includes(this.props.id);
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
        tasks={tasks}
        refreshStatus={this.props.fetchTaskStatus}
        viewFile={this.viewFile}
      />
    );
  }
}

TaskContainer.defaultProps = {
  id: null,
  navbar: true,
};

TaskContainer.propTypes = {
  fetchTaskStatus: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  id: PropTypes.string,
  navbar: PropTypes.bool,
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
  tasks: taskSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchTaskStatus: () => {
    dispatch(getTaskStatus());
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskContainer);

export default withRouter(ConnectedContainer);
