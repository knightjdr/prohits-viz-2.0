import PropTypes from 'prop-types';
import React from 'react';

const ContextMenu = ({
  children,
  setRef,
}) => (
  <div
    className="context-menu-mock-wrapper"
    ref={setRef}
  >
    {children}
  </div>
);

ContextMenu.defaultProps = {
  children: null,
};

ContextMenu.propTypes = {
  children: PropTypes.shape({}),
  setRef: PropTypes.shape({}).isRequired,
};

export default ContextMenu;
