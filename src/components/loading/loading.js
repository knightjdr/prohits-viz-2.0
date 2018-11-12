import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Spin } from 'antd';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

import './loading.css';

const Loading = ({
  error,
  message,
  pastDelay,
}) => {
  if (error) {
    return (
      <div className="loading">
        <div className="loading_error">
          <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
          <span>{message}</span>
        </div>
      </div>
    );
  } else if (pastDelay) {
    return (
      <div className="loading">
        <Spin size="large" />;
      </div>
    );
  }
  return null;
};

Loading.defaultProps = {
  error: false,
  message: 'There was an error loading this component',
  pastDelay: true,
};

Loading.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string,
  pastDelay: PropTypes.bool,
};

export default Loading;
