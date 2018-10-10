import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import getTaskStatus from '../../../state/post/task-thunk';
import Status from './status';
import taskSelector from '../../../state/selectors/task-selector';

class StatusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
    };
  }
  componentWillMount = () => {
    const { fetchTaskStatus, taskID } = this.props;
    fetchTaskStatus(taskID);
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateContent(nextProps.tasks, nextProps.taskID, this.props.tasks);
    this.updateTasks(nextProps.tasks.shouldUpdate);
  }
  updateContent = (tasks, taskID, prevTasks) => {
    const currentStatus = tasks.status.find(task => task.id === taskID);
    const prevStatus = prevTasks.status.find(task => task.id === taskID);
    if (
      currentStatus &&
      (
        this.state.status === 'loading' ||
        currentStatus.status !== prevStatus.status
      )
    ) {
      this.setState({
        status: currentStatus.status,
      });
    }
  }
  updateTasks = (shouldUpdate) => {
    if (shouldUpdate) {
      const { fetchTaskStatus, taskID } = this.props;
      fetchTaskStatus(taskID);
    }
  }
  render() {
    return (
      <Status
        closeModal={this.props.closeModal}
        status={this.state.status}
        taskID={this.props.taskID}
        visible={Boolean(this.props.taskID)}
      />
    );
  }
}

StatusContainer.defaultProps = {
  taskID: null,
};

StatusContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  fetchTaskStatus: PropTypes.func.isRequired,
  taskID: PropTypes.string,
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
  fetchTaskStatus: (id) => {
    dispatch(getTaskStatus(id));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusContainer);

export default ConnectedContainer;
