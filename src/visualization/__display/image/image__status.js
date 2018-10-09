import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faCog, faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

const statusContent = {
  error: {
    color: 'image__status_red',
    icon: faExclamationTriangle,
    message: 'There was an error displaying this image.',
    spin: false,
  },
  updating: {
    color: 'image__status_default',
    icon: faCog,
    message: 'loading...',
    spin: true,
  },
};

const Status = ({
  error,
  loading,
}) => {
  let content;
  if (error) {
    content = statusContent.error;
  } else if (loading) {
    content = statusContent.updating;
  } else {
    content = statusContent.error;
  }
  return (
    <div className="image__status">
      <div className="image__status-inner">
        <FontAwesomeIcon
          className={content.color}
          icon={content.icon}
          spin={content.spin}
        />
        <span>{ content.message }</span>
      </div>
    </div>
  );
};

Status.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Status;
