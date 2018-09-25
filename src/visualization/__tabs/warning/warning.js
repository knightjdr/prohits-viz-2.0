import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

import './warning.css';

const Warning = ({
  children,
}) => (
  <div className="visualization__warning">
    <FontAwesomeIcon icon={faExclamationTriangle} />
    <div>
      { children }
    </div>
  </div>
);

Warning.defaultProps = {
  children: 'Warning',
};

Warning.propTypes = {
  children: PropTypes.string,
};

export default Warning;
