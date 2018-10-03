import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import arrUnique from '../helpers/arr-unique';
import getFile from '../helpers/get-file';
import getTaskStatus from '../state/post/task-thunk';
import Tasks from './tasks';
import taskSelector from '../state/selectors/task-selector';
import { arrayShallowEqual } from '../helpers/array-shallow-equal';

export class TaskContainer extends Component {
  componentDidMount = () => {
    this.refreshStatus();
  }
  componentWillReceiveProps = (nextProps) => {
    const { tasks } = nextProps;
    this.updateTasks(tasks.list, this.props.tasks.list);
  }
  changeFile = (task, value) => {
    this.selectFiles[task] = value;
  }
  downloadFolder = (id) => {
    getFile(`task/${id}`, { ext: 'zip', name: id });
  }
  refreshStatus = () => {
    const { fetchTaskStatus, tasks } = this.props;
    const allTasks = [
      ...tasks.list,
      ...this.storedTasks,
    ];
    fetchTaskStatus(arrUnique(allTasks));
  }
  selectFiles = {}
  storedTasks = () => []
  updateTasks = (list, prevList) => {
    if (!arrayShallowEqual(list, prevList)) {
      this.refreshStatus();
    }
  }
  viewFile = (id) => {
    if (this.selectFiles[id]) {
      this.props.history.push(`/visualization/${id}/${this.selectFiles[id]}`);
    }
  }
  render() {
    return (
      <Tasks
        changeFile={this.changeFile}
        downloadFolder={this.downloadFolder}
        error={this.props.tasks.didError}
        isUpdating={this.props.tasks.isUpdating}
        tasks={this.props.tasks.status}
        refreshStatus={this.refreshStatus}
        viewFile={this.viewFile}
      />
    );
  }
}


TaskContainer.propTypes = {
  fetchTaskStatus: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  tasks: PropTypes.shape({
    didError: PropTypes.bool,
    isUpdating: PropTypes.bool,
    list: PropTypes.arrayOf(
      PropTypes.string,
    ),
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
  fetchTaskStatus: (tasks) => {
    dispatch(getTaskStatus(tasks));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskContainer);

export default withRouter(ConnectedContainer);
