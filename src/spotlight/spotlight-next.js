import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faArrowAltCircleRight } from '@fortawesome/pro-solid-svg-icons';

const Next = ({
  onClick,
}) => (
  <FontAwesomeIcon
    icon={faArrowAltCircleRight}
    onClick={onClick}
  />
);

Next.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Next;
