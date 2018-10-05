import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import scrollTop from '../../helpers/scroll-top';

const RouterLink = ({
  children,
  className,
  to,
  type,
  ...otherProps
}) => (
  <Link
    className={className}
    onClick={scrollTop}
    to={to}
    {...otherProps}
  >
    { children }
  </Link>
);

RouterLink.defaultProps = {
  children: 'link',
  className: null,
};

RouterLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ]).isRequired,
};

export default RouterLink;
