import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  faCog,
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/pro-solid-svg-icons';

import Link from '../../../components/router-link/router-link';

const statusContent = {
  complete: {
    alert: 'The task is complete.',
    color: 'analysis__task-status_green',
    icon: faCheck,
    link: true,
    message: (
      <p>
        Click on the link below to view the results.
      </p>
    ),
    spin: false,
  },
  error: {
    alert: 'There was an error running the task.',
    color: 'analysis__task-status_red',
    icon: faExclamationTriangle,
    link: true,
    message: (
      <p>
        Click on the link below to view the error log.
      </p>
    ),
    spin: false,
  },
  loading: {
    alert: 'Initializing...',
    color: 'analysis__task-status_default',
    icon: faCog,
    link: null,
    spin: true,
  },
  running: {
    alert: 'The task is running.',
    color: 'analysis__task-status_default',
    icon: faCog,
    link: true,
    message: (
      <Fragment>
        <p>You can track its status from:</p>
        <ol>
          <li>This window</li>
          <li>From the link below</li>
          <li>
            By clicking the &quot;Tasks&quot; link on the navigation menu
            at the top of the page
          </li>
        </ol>
        <p>The task results will be available for 24 hours.</p>
      </Fragment>
    ),
    spin: true,
  },
};

const StatusContent = ({
  status,
  id,
}) => {
  const content = statusContent[status];
  const link = content.link ? `/visualization/${id}` : null;
  return (
    <Fragment>
      <div className="analysis__task-status-alert">
        <FontAwesomeIcon
          className={content.color}
          icon={content.icon}
          spin={content.spin}
        />
        {content.alert}
      </div>
      {content.message}
      {
        link &&
        <Link to={link}>
          {process.env.REACT_APP_HOME_ROOT}{link}
        </Link>
      }
    </Fragment>
  );
};

StatusContent.defaultProps = {
  id: PropTypes.string,
};

StatusContent.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string.isRequired,
};

export default StatusContent;
