import PropTypes from 'prop-types';
import React from 'react';

const Rows = ({
  cellSize,
  fontSize,
  names,
  openContextMenu,
  toggleTooltip,
}) => {
  const textOffset = (cellSize / 2) - (fontSize / 4);
  return (
    <g transform="translate(0 100)">
      {
        names.map((name, i) => {
          // 98px is used as the height of the text to give a bit of padding.
          const y = Math.round(((i + 1) * cellSize) - textOffset);
          return (
            <text
              fontSize={fontSize}
              key={name.original}
              onContextMenu={(e) => { openContextMenu(e, name.original); }}
              onMouseEnter={(e) => {
                toggleTooltip(name.trimmed, true, name.original, e.clientX, 50);
              }}
              onMouseLeave={() => { toggleTooltip(name.trimmed, false, name.original); }}
              textAnchor="end"
              x="98"
              y={y}
            >
              {name.text}
            </text>
          );
        })
      }
    </g>
  );
};

Rows.propTypes = {
  cellSize: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  names: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string,
      text: PropTypes.string,
      trimmed: PropTypes.bool,
    }),
  ).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

export default Rows;
