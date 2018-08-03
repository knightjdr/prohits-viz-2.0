import PropTypes from 'prop-types';
import React from 'react';

import './selection.css';

const Select = ({
  canPaste,
  listSelect,
  openContextMenu,
  options,
  setRef,
  target,
}) => (
  <select
    className="selection__select"
    multiple
    onChange={(e) => { listSelect(e, target); }}
    onContextMenu={(e) => { openContextMenu(e, canPaste, target); }}
    ref={setRef}
  >
    [<option className="selection__select_option-hidden" value="">Placeholder</option>,
    ...{
      options.map(item => (
        <option
          key={item}
          value={item}
        >
          {item}
        </option>
      ))
    }]
  </select>
);

Select.defaultProps = {
  canPaste: false,
  setRef: null,
};

Select.propTypes = {
  canPaste: PropTypes.bool,
  listSelect: PropTypes.func.isRequired,
  openContextMenu: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  setRef: PropTypes.shape({}),
  target: PropTypes.string.isRequired,
};

export default Select;
