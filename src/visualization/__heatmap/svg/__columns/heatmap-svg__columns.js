import PropTypes from 'prop-types';
import React from 'react';

import TrimText from '../helpers/trim-text';

const Columns = ({
  cellSize,
  fontSize,
  names,
  openContextMenu,
  reference,
  sortColumn,
  toggleTooltip,
}) => {
  const textOffset = cellSize / 4;
  return (
    <g transform="translate(100 0)">
      {
        names.reduce((textElements, name, i) => {
          // 98px is used as the height of the text to give a bit of padding.
          const text = TrimText(name, 'BodyText', `${fontSize}px`, 98);
          const x = Math.round((i * cellSize) + textOffset);
          if (reference === name) {
            textElements.push(
              <rect
                fill="#90afc5"
                height="100"
                key={`${name}-reference`}
                width={cellSize}
                x={x - textOffset}
                y="0"
              />,
            );
          }
          textElements.push(
            <text
              fontSize={fontSize}
              key={name}
              onClick={(e) => { sortColumn(e, name); }}
              onContextMenu={(e) => { openContextMenu(e, name); }}
              onMouseEnter={(e) => { toggleTooltip(text.trimmed, true, name, e.clientX, 50); }}
              onMouseLeave={() => { toggleTooltip(text.trimmed, false, name); }}
              textAnchor="end"
              transform={`rotate(90, ${x}, 98)`}
              x={x}
              y="98"
            >
              {text.text}
            </text>,
          );
          return textElements;
        }, [])
      }
    </g>
  );
};

Columns.defaultProps = {
  reference: null,
};

Columns.propTypes = {
  cellSize: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  reference: PropTypes.string,
  sortColumn: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

export default Columns;
