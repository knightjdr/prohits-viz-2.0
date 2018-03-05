import PropTypes from 'prop-types';
import Rainbow from 'rainbowvis.js';
import React from 'react';

import './pipeline.css';

const cellWidth = 24;
const intervals = {
  leftSlide: 1.5,
  leftResizeStart: 1.25,
  leftResizeDuration: 0.25,
  rightAppearDelay: 2.0,
  rightResizeDuration: 0.5,
  rightResizeStart: 0.2,
  rightSlide: 1.5,
};
const rainbow = new Rainbow();
rainbow.setSpectrum('#f5f5f5', '#AC867C', '#763626');

const Pipeline = ({
  data,
  path,
  rows,
  scale,
}) => {
  const leftSlide = intervals.leftSlide * scale;
  const leftResizeDuration = intervals.leftResizeDuration * scale;
  const leftResizeStart = intervals.leftResizeStart * scale;
  const rightAppearDelay = intervals.rightAppearDelay * scale;
  const rightResizeDuration = intervals.rightResizeDuration * scale;
  const rightResizeStart = intervals.rightResizeStart * scale;
  const rightSlide = intervals.rightSlide * scale;
  const heatmap = {
    column: 0,
    row: 0,
  };
  const svgElement = {
    circles: [],
    squares: [],
    text: [],
  };
  data.forEach((point, index) => {
    const color = `#${rainbow.colorAt(point)}`;
    const key = {
      colorCircle: `colorCircle-${index}`,
      colorRect: `colorRect-${index}`,
      text: `text-${index}`,
      textCircle: `leftCircle-${index}`,
    };
    const leftDelay = index * leftSlide;
    const leftResizeDelay = leftDelay + leftResizeStart;
    const rightDelay = leftDelay + rightAppearDelay;
    const rightResizeDelay = rightDelay + rightResizeStart;
    const rightMorphDelay = rightResizeDelay + rightResizeDuration;
    if (heatmap.row >= rows) {
      heatmap.column += 1;
      heatmap.row = 0;
    }
    const end = {
      x: path.rightSlide.xP - (cellWidth * heatmap.column),
      y: path.rightSlide.yP + (cellWidth * heatmap.row),
    };
    heatmap.row += 1;
    svgElement.circles.push(
      <g
        key={key.textCircle}
      >
        <circle
          className="Pipeline-datapoint-circle"
          opacity="0"
          r="12"
          transform="translate(0, -5)"
        >
          <animate
            attributeName="opacity"
            attributeType="CSS"
            begin={leftDelay}
            dur="0.5s"
            fill="freeze"
            from="0"
            to="1"
          />
          <animateTransform
            additive="sum"
            attributeName="transform"
            begin={leftResizeDelay}
            dur={leftResizeDuration}
            fill="freeze"
            from="1 1"
            to="0 0"
            type="scale"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          begin={leftDelay}
          dur={leftSlide}
          fill="freeze"
          from={`${path.leftSlide.x} ${path.leftSlide.y}`}
          to={`${path.leftSlide.xP} ${path.leftSlide.y}`}
          type="translate"
        />
      </g>,
    );
    svgElement.circles.push(
      <g
        key={key.colorCircle}
      >
        <circle
          className="Pipeline-heatmap-circle"
          fill={color}
          opacity="0"
          r="6"
          transform="translate(0, -5)"
        >
          <animate
            attributeName="opacity"
            attributeType="CSS"
            begin={rightDelay}
            dur="0.5s"
            fill="freeze"
            from="0"
            to="1"
          />
          <animateTransform
            additive="sum"
            attributeName="transform"
            begin={rightResizeDelay}
            dur={rightResizeDuration}
            fill="freeze"
            from="1 1"
            to="2 2"
            type="scale"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          begin={rightDelay}
          dur={rightSlide}
          fill="freeze"
          from={`${path.rightSlide.x} ${path.rightSlide.y}`}
          to={`${end.x} ${end.y}`}
          type="translate"
        />
      </g>,
    );
    svgElement.squares.push(
      <g
        key={key.colorRect}
      >
        <g>
          <rect
            className="Pipeline-heatmap-rect"
            fill={color}
            height="12"
            opacity="0"
            width="12"
          >
            <animate
              attributeName="opacity"
              attributeType="CSS"
              begin={rightMorphDelay}
              dur="0.5s"
              fill="freeze"
              from="0"
              to="1"
            />
            <animateTransform
              additive="sum"
              attributeName="transform"
              begin={rightMorphDelay}
              dur={rightResizeDuration}
              fill="freeze"
              from="1 1"
              to="2 2"
              type="scale"
            />
          </rect>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            begin={rightDelay}
            dur={rightSlide}
            fill="freeze"
            from={`${path.rightSlide.x} ${path.rightSlide.y}`}
            to={`${end.x} ${end.y}`}
            type="translate"
          />
        </g>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          begin={rightMorphDelay}
          dur={rightResizeDuration}
          fill="freeze"
          from="-5 -10"
          to="-12 -17"
          type="translate"
        />
      </g>,
    );
    svgElement.text.push(
      <g
        key={key.text}
      >
        <text
          className="Pipeline-datapoint-text"
          opacity="0"
          textAnchor="middle"
        >
          { point }
          <animate
            attributeName="opacity"
            attributeType="CSS"
            begin={leftDelay}
            dur="0.5s"
            fill="freeze"
            from="0"
            to="1"
          />
          <animateTransform
            additive="sum"
            attributeName="transform"
            begin={leftResizeDelay}
            dur={leftResizeDuration}
            fill="freeze"
            from="1 1"
            to="0 0"
            type="scale"
          />
        </text>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          begin={leftDelay}
          dur={leftSlide}
          fill="freeze"
          from={`${path.leftSlide.x} ${path.leftSlide.y}`}
          to={`${path.leftSlide.xP} ${path.leftSlide.y}`}
          type="translate"
        />
      </g>,
    );
  });
  return ([
    <svg
      className="Pipeline-container Pipeline-shadow"
      key="squares"
    >
      { svgElement.squares }
    </svg>,
    <svg
      className="Pipeline-container"
      key="circles"
    >
      { svgElement.circles }
    </svg>,
    <svg
      className="Pipeline-container"
      key="text"
    >
      { svgElement.text }
    </svg>,
  ]);
};

Pipeline.defaultProps = {
  rows: null,
  scale: null,
};

Pipeline.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  path: PropTypes.shape({
    left: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      xP: PropTypes.number,
      yP: PropTypes.number,
    }),
  }).isRequired,
  rows: PropTypes.number,
  scale: PropTypes.number,
};

export default Pipeline;
