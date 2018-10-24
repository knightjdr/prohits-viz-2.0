import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import reorderIcons from './customize__reorder-icons';

const Reorder = ({
  cellSize,
  circle,
  column,
  coverItem,
  dimensions,
  fontSize,
  lines,
  mouseDownColumn,
  mouseDownRow,
  mouseMoveColumn,
  mouseMoveRow,
  mouseUp,
  row,
  show,
  showIcons,
  text,
}) => (
  show
  && (
    <Fragment>
      <g transform="translate(100 0)">
        <rect
          fillOpacity={0}
          height={column.height}
          onMouseLeave={mouseUp}
          onMouseMove={circle.show ? mouseMoveColumn : null}
          onMouseUp={mouseUp}
          width={column.width}
        />
        {
          showIcons
          && reorderIcons(dimensions.pageX, cellSize, 'col', mouseDownColumn)
        }
      </g>
      <g transform="translate(0 100)">
        <rect
          fillOpacity={0}
          height={row.height}
          onMouseLeave={mouseUp}
          onMouseMove={circle.show ? mouseMoveRow : null}
          onMouseUp={mouseUp}
          width={row.width}
        />
        {
          showIcons
          && reorderIcons(dimensions.pageY, cellSize, 'row', mouseDownRow)
        }
      </g>
      {
        circle.show
        && (
          <g pointerEvents="none">
            <rect
              fill="#fff"
              height={coverItem.height}
              width={coverItem.width}
              x={coverItem.x}
              y={coverItem.y}
            />
            <g transform={`rotate(${text.rotation} ${text.x} ${text.y}) translate(${text.x} ${text.y})`}>
              <rect
                fill="#fff"
                height={text.height}
                transform={text.transform}
                width={text.width}
              />
              <text
                alignmentBaseline="middle"
                fontSize={fontSize}
              >
                {text.name}
              </text>
            </g>
            <line
              stroke="#000"
              strokeDasharray={4}
              x1={lines.a.x1}
              x2={lines.a.x2}
              y1={lines.a.y1}
              y2={lines.a.y2}
            />
            <line
              stroke="#000"
              strokeDasharray={4}
              x1={lines.b.x1}
              x2={lines.b.x2}
              y1={lines.b.y1}
              y2={lines.b.y2}
            />
            <circle
              cx={circle.x}
              cy={circle.y}
              fill="#336B87"
              r={circle.radius}
            />
          </g>
        )
      }
    </Fragment>
  )
);

Reorder.propTypes = {
  cellSize: PropTypes.number.isRequired,
  circle: PropTypes.shape({
    radius: PropTypes.number,
    show: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  column: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  coverItem: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  dimensions: PropTypes.shape({
    pageX: PropTypes.number,
    pageY: PropTypes.number,
  }).isRequired,
  fontSize: PropTypes.number.isRequired,
  lines: PropTypes.shape({
    a: PropTypes.shape({
      x1: PropTypes.number,
      x2: PropTypes.number,
      y1: PropTypes.number,
      y2: PropTypes.number,
    }),
    b: PropTypes.shape({
      x1: PropTypes.number,
      x2: PropTypes.number,
      y1: PropTypes.number,
      y2: PropTypes.number,
    }),
  }).isRequired,
  mouseDownColumn: PropTypes.func.isRequired,
  mouseDownRow: PropTypes.func.isRequired,
  mouseMoveColumn: PropTypes.func.isRequired,
  mouseMoveRow: PropTypes.func.isRequired,
  mouseUp: PropTypes.func.isRequired,
  row: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  showIcons: PropTypes.bool.isRequired,
  text: PropTypes.shape({
    height: PropTypes.number,
    name: PropTypes.string,
    rotation: PropTypes.number,
    transform: PropTypes.string,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

export default Reorder;
