import PropTypes from 'prop-types';
import Rainbow from 'rainbowvis.js';
import React from 'react';

import './pipeline.css';

const intervals = {
  leftSlide: 1.5,
  leftFadeBegin: 2,
  leftFadeDuration: 1,
  leftTransformBegin: 2,
};
const rainbow = new Rainbow();
rainbow.setSpectrum('#f5f5f5', '#AC867C', '#763626');

const Pipeline = ({
  data,
  path,
}) => {
  const dataElement = data.map((point, index) => {
    const color = `#${rainbow.colorAt(point)}`;
    const key = {
      ellipse: `ellipse-${index}`,
      leftRectMask: `leftRectMask-${index}`,
      text: `text-${index}`,
    };
    const leftDelay = index * intervals.leftSlide;
    const leftFadeDelay = leftDelay + intervals.leftFadeBegin;
    const leftEllipseFadeDelay = leftFadeDelay + intervals.leftFadeDuration;
    return ([
      <text
        className="Pipeline-datapoint"
        key={key.text}
        opacity="0"
        textAnchor="right"
        y={path.leftSlide.y}
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
        <animate
          attributeName="x"
          begin={leftDelay}
          dur={intervals.leftSlide}
          fill="freeze"
          from={path.leftSlide.x}
          to={path.leftSlide.xP}
          repeatCount="0"
        />
        <animate
          attributeName="opacity"
          attributeType="CSS"
          begin={leftFadeDelay}
          dur={intervals.leftFadeDuration}
          fill="freeze"
          from="1"
          to="0"
        />
      </text>,
      <ellipse
        clipPath="url(#Pipeline-left-clip)"
        cx={path.leftCircle.x}
        cy={path.leftCircle.y}
        fill={color}
        key={key.ellipse}
        opacity="0"
        rx="5"
        ry="5"
      >
        <animate
          attributeName="opacity"
          attributeType="CSS"
          begin={leftFadeDelay - 0.5}
          dur="0.5s"
          fill="freeze"
          from="0"
          to="1"
        />
        <animate
          attributeName="cx"
          begin={leftFadeDelay}
          dur={intervals.leftFadeDuration}
          fill="freeze"
          from={path.leftCircle.x}
          to={path.leftCircle.xP}
          repeatCount="0"
        />
        <animate
          attributeName="rx"
          begin={leftFadeDelay}
          dur={intervals.leftFadeDuration}
          fill="freeze"
          from="5"
          to="10"
          repeatCount="0"
        />
        <animate
          attributeName="ry"
          begin={leftFadeDelay}
          dur={intervals.leftFadeDuration}
          fill="freeze"
          from="5"
          to="10"
          repeatCount="0"
        />
        <animate
          attributeName="opacity"
          attributeType="CSS"
          begin={leftEllipseFadeDelay}
          dur="0.8s"
          fill="freeze"
          from="1"
          to="0"
        />
      </ellipse>,
    ]);
  });
  const defs = path.leftCircle ?
    (
      <defs>
        <clipPath id="Pipeline-left-clip">
          <rect
            height="20"
            width="20"
            x={path.leftCircle.x}
            y={path.leftCircle.y - 10}
          />
        </clipPath>
      </defs>
    )
    :
    null;
  return (
    <svg className="Pipeline-container">
      { defs }
      { dataElement }
    </svg>
  );
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
};

export default Pipeline;
