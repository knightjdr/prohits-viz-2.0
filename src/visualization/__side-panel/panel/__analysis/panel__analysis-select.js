import PropTypes from 'prop-types';
import React from 'react';

import './panel__analysis';

const Select = ({
  canPaste,
  openContextMenu,
  options,
}) => (
  <select
    className="panel__analysis-select"
    multiple
    onContextMenu={(e) => { openContextMenu(e, canPaste); }}
  >
    {options.map(item => (
      <option
        key={item}
        value={item}
      >
        {item}
      </option>
    ))}
  </select>
);

Select.defaultProps = {
  canPaste: false,
};

Select.propTypes = {
  canPaste: PropTypes.bool,
  openContextMenu: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Select;
