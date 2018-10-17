import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faCog, faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

const statusContent = {
  error: {
    color: 'tasks__status_red',
    icon: faExclamationTriangle,
    message: 'There was an error updating task status.',
    spin: false,
  },
  missing: {
    color: 'tasks__status_red',
    icon: faExclamationTriangle,
    message: 'The specified task could not be found.',
    spin: false,
  },
  noTasks: {
    color: 'tasks__status_red',
    icon: faExclamationTriangle,
    message: `You have no tasks currenty running or available for viewing.
    All tasks are deleted after 24 hours.`,
    spin: false,
  },
  updating: {
    color: 'tasks__status_default',
    icon: faCog,
    message: 'Updating task status...',
    spin: true,
  },
};

const Status = ({
  error,
  isUpdating,
  missing,
  taskNo,
}) => {
  let content;
  if (error) {
    content = statusContent.error;
  } else if (missing) {
    content = statusContent.missing;
  } else if (isUpdating) {
    content = statusContent.updating;
  } else if (taskNo === 0) {
    content = statusContent.noTasks;
  } else {
    content = statusContent.error;
  }
  return (
    <div className="tasks__status">
      <div className="tasks__status-inner">
        <FontAwesomeIcon
          className={content.color}
          icon={content.icon}
          spin={content.spin}
        />
        { content.message }
      </div>
    </div>
  );
};

Status.defaultProps = {
  missing: false,
};

Status.propTypes = {
  error: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  missing: PropTypes.bool,
  taskNo: PropTypes.number.isRequired,
};

export default Status;
