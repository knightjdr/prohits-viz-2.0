import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  faCheck,
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/pro-solid-svg-icons';

const status = (taskStatus) => {
  switch (taskStatus) {
    case 'complete':
      return (
        <span className="tasks__complete">
          <FontAwesomeIcon icon={faCheck} />
          complete
        </span>
      );
    case 'error':
      return (
        <span className="tasks__error">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          error
        </span>
      );
    default:
      return (
        <span className="tasks__running">
          <FontAwesomeIcon icon={faSpinner} spin />
          running
        </span>
      );
  }
};

export default status;
