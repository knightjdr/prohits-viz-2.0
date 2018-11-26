import PropTypes from 'prop-types';
import React from 'react';

import Tasks from '../../tasks/tasks-container';

const VisualizationDisplay = ({
  match,
}) => (
  <Tasks
    id={match.params.id}
  />
);

VisualizationDisplay.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default VisualizationDisplay;
