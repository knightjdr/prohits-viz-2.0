import PropTypes from 'prop-types';
import React from 'react';

import './panel__analysis';

const Select = ({
  canPaste,
  listSelect,
  openContextMenu,
  options,
  target,
}) => (
  <select
    className="panel__analysis-select"
    multiple
    onChange={(e) => { listSelect(e, target); }}
    onContextMenu={(e) => { openContextMenu(e, canPaste, target); }}
  >
    [<option className="panel__analysis-select_option-hidden" value="">Placeholder</option>,
    ...{options.map(item => (
      <option
        key={item}
        value={item}
      >
        {item}
      </option>
    ))}]
  </select>
);

Select.defaultProps = {
  canPaste: false,
};

Select.propTypes = {
  canPaste: PropTypes.bool,
  listSelect: PropTypes.func.isRequired,
  openContextMenu: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  target: PropTypes.string.isRequired,
};

export default Select;
