import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faTasks } from '@fortawesome/pro-solid-svg-icons';

import RouterLink from '../components/router-link/router-link';

const Tasks = ({
  smallScreen,
  tasks,
}) => {
  if (tasks.length === 0) {
    return null;
  } if (smallScreen) {
    return (
      <RouterLink to="/tasks">
        <FontAwesomeIcon
          className="navbar__tasks-icon"
          icon={faTasks}
        />
      </RouterLink>
    );
  }
  return (
    <RouterLink
      className="navbar__link"
      to="/tasks"
    >
      Tasks
    </RouterLink>
  );
};

Tasks.propTypes = {
  smallScreen: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Tasks;
