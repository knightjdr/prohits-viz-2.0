import PropTypes from 'prop-types';
import Rainbow from 'rainbowvis.js';
import React from 'react';

import './pipeline.css';

const cellWidth = 24;
const rainbow = new Rainbow();
rainbow.setSpectrum('#f5f5f5', '#AC867C', '#763626');

const Pipeline = ({
  clouds,
  data,
  draw,
  dude,
  endAnimation,
  intervals,
  path,
  rows,
  square,
}) => {
  let element = null;
  const heatmap = {
    column: 0,
    row: 0,
  };
  const svgElement = {
    circles: [],
    cloud: null,
    dude: [],
    square: null,
    squares: [],
    text: [],
  };
  if (draw) {
    data.forEach((point, index) => {
      const color = `#${rainbow.colorAt(point)}`;
      const key = {
        colorCircle: `colorCircle-${index}`,
        colorRect: `colorRect-${index}`,
        text: `text-${index}`,
        textCircle: `leftCircle-${index}`,
      };
      const leftDelay = index * intervals.leftSlide;
      const leftResizeDelay = leftDelay + intervals.leftResizeStart;
      const rightDelay = leftDelay + intervals.rightAppearDelay;
      const rightResizeDelay = rightDelay + intervals.rightResizeStart;
      const rightMorphDelay = rightResizeDelay + intervals.rightResizeDuration;
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
              dur={intervals.leftResizeDuration}
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
            dur={intervals.leftSlide}
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
              dur={intervals.rightResizeDuration}
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
            dur={intervals.rightSlide}
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
                dur={intervals.rightResizeDuration}
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
              dur={intervals.rightSlide}
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
            dur={intervals.rightResizeDuration}
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
              dur={intervals.leftResizeDuration}
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
            dur={intervals.leftSlide}
            fill="freeze"
            from={`${path.leftSlide.x} ${path.leftSlide.y}`}
            to={`${path.leftSlide.xP} ${path.leftSlide.y}`}
            type="translate"
          />
        </g>,
      );
    });
    svgElement.square = (
      <g
        transform={`translate(${square.x}, ${square.y})`}
      >
        <rect
          fill="#F5F5F5"
          height={square.height}
          opacity="0"
          width={square.width}
        >
          <animate
            attributeName="opacity"
            attributeType="CSS"
            begin={intervals.rightAppearDelay}
            dur="1s"
            fill="freeze"
            from="0"
            to="1"
          />
        </rect>
      </g>
    );
    svgElement.cloud = (
      <g
        className="Pipeline-clouds"
        key="clouds"
        transform={`translate(${clouds.x}, ${clouds.y})`}
      >
        <g
          opacity="0"
        >
          <path
            fill="#763626"
            d="M138.422,14.336c-8.441,0-16.208,2.682-22.398,7.174C112.494,9.193,
            98.66,0,82.121,0C71.58,0,62.141,3.738,55.762,
            9.634c-4.618-1.997-9.784-3.118-15.239-3.118c-19.607,0-35.502,
            14.441-35.502,32.255c0,7.312,2.682,14.053,7.195,19.463C4.667,61.181,
            0,65.241,0,69.725c0,8.997,18.785,16.291,41.957,16.291c13.149,0,
            24.88-2.35,32.573-6.025c5.51,5.703,13.458,9.283,22.294,9.283c9.634,0,
            18.205-4.261,23.719-10.884c5.288,2.777,11.383,4.368,17.879,4.368c20.201,
            0,36.578-15.316,36.578-34.21S158.624,14.336,138.422,14.336z"
          />
          <path
            fill="#AC867C"
            d="M160.967,55.897c0-14.556-10.783-26.355-24.085-26.355c-6.238,
            0-11.923,2.595-16.201,
            6.853c-5.278-4.719-13.404-7.747-22.525-7.747c-4.029,0-7.862,
            0.592-11.344,1.657c-4.261-1.628-9.067-2.55-14.158-2.55c-17.475,
            0-31.642,10.8-31.642,24.122c0,3.975,1.269,7.722,3.503,11.028c-12.563,
            2.494-21.449,8.614-21.449,15.774c0,9.375,15.224,16.975,34.003,
            16.975c7.695,0,14.79-1.277,20.488-3.429c5.172,5.813,14.364,9.683,
            24.849,9.683c13.623,0,25.072-6.53,28.342-15.373c0.756,0.116,1.542,
            0.185,2.355,0.185c4.958,0,9.055-2.296,9.789-5.294C153.286,78.504,
            160.967,68.182,160.967,55.897z"
          />
          <line
            fill="none"
            stroke="#763626"
            strokeWidth="4"
            strokeMiterlimit="10"
            x1="91.474"
            y1="74.599"
            x2="91.474"
            y2="125"
          />
          <line
            fill="none"
            stroke="#763626"
            strokeWidth="4"
            strokeMiterlimit="10"
            x1="61.647"
            y1="83.668"
            x2="82.528"
            y2="125"
          />
          <line
            fill="none"
            stroke="#763626"
            strokeWidth="4"
            strokeMiterlimit="10"
            x1="121.3"
            y1="83.668"
            x2="100.419"
            y2="125"
          />
          <animate
            attributeName="opacity"
            attributeType="CSS"
            begin={clouds.start}
            dur={clouds.dur}
            from="0"
            to="0.7"
            repeatCount={clouds.repeatCount}
          />
        </g>
        <animateTransform
          additive="sum"
          attributeName="transform"
          begin={clouds.start}
          dur={clouds.dur}
          from="0 0"
          repeatCount={clouds.repeatCount}
          to="1 1"
          type="scale"
        />
      </g>
    );
    const dudeConfusedY = dude.y - 140;
    svgElement.dude.push(
      <g
        key="confused"
        opacity="0"
        transform={`translate(${dude.x}, ${dudeConfusedY})`}
      >
        <circle
          fill="none"
          stroke="#763626"
          strokeWidth="5"
          strokeMiterlimit="10"
          cx="65"
          cy="65"
          r="62.5"
        />
        <circle
          fill="#763626"
          cx="44"
          cy="51.406"
          r="10"
        />
        <circle
          fill="#763626"
          cx="86"
          cy="51.406"
          r="10"
        />
        <line
          fill="none"
          stroke="#763626"
          strokeWidth="5"
          strokeMiterlimit="10"
          x1="37"
          y1="82.406"
          x2="84"
          y2="99.406"
        />
        <line
          fill="none"
          stroke="#763626"
          strokeWidth="5"
          strokeMiterlimit="10"
          x1="75.625"
          y1="36.219"
          x2="92.875"
          y2="30.594"
        />
        <line
          fill="none"
          stroke="#763626"
          strokeWidth="5"
          strokeMiterlimit="10"
          x1="52.848"
          y1="37.128"
          x2="35.598"
          y2="31.503"
        />
        <path
          fill="#763626"
          strokeMiterlimit="10"
          d="M36.99,116.572l15.264,4.937c-0.325-1.036-0.534-2.042-0.624-3.016
          c-0.342-3.704,3.226-6.518,6.726-5.384c1.904,0.616,2.933,2.179,3.128,4.298
          c0.305,3.294,5.917,9.181,8.44,11.465c1.564,1.405,2.068,3.548,1.46,5.427h0.001l-5.674,17.543
          c-0.391,1.208-1.604,1.955-2.856,1.754c-5.03-0.808-7.59,1.893-13.923-0.174
          c-0.278-0.091-1.362-0.418-1.643-0.51c-5.181-1.675-7.612-4.961-5.068-9.689
          c-1.595-1.566-1.838-5.055,0.379-6.917c-1.82-2.982-0.532-6.263,1.702-7.465l-10.212-3.303
          c-2.47-0.799-3.914-3.549-3.132-5.964C31.729,117.192,34.592,115.797,36.99,
          116.572L36.99,116.572z M76.742,131.708l4.909,1.588c1.356,0.438,2.1,1.894,
          1.661,3.249l-6.351,19.637c-0.438,1.355-1.893,2.1-3.249,1.661l-4.909-1.588
          c-1.355-0.438-2.099-1.893-1.661-3.248l6.351-19.638C73.933,132.014,75.387,
          131.27,76.742,131.708z M72.185,154.186c1.13,0.365,2.342-0.255,2.707-1.384
          c0.366-1.131-0.253-2.342-1.383-2.707s-2.342,0.253-2.708,1.384C70.435,
          152.607,71.055,153.82,72.185,154.186z"
        />
        <animate
          attributeName="opacity"
          attributeType="CSS"
          begin={dude.startConfused}
          dur={dude.durConfused}
          from="0"
          to="0.8"
        />
      </g>,
    );
    const dudeIdeaY = dude.y - 195;
    svgElement.dude.push(
      <g
        key="idea"
        opacity="0"
        transform={`translate(${dude.x}, ${dudeIdeaY})`}
      >
        <circle
          fill="none"
          stroke="#763626"
          strokeWidth="5"
          strokeMiterlimit="10"
          cx="65"
          cy="119.733"
          r="62.5"
        />
        <circle
          fill="#763626"
          cx="43.908"
          cy="102.844"
          r="10"
        />
        <circle
          fill="#763626"
          cx="85.908"
          cy="102.844"
          r="10"
        />
        <circle
          fill="#763626"
          cx="66.248"
          cy="144.184"
          r="14.25"
        />
        <line
          fill="none"
          stroke="#763626"
          strokeWidth="5"
          strokeMiterlimit="10"
          x1="32.535"
          y1="86.659"
          x2="49.785"
          y2="81.034"
        />
        <line
          fill="none"
          stroke="#763626"
          strokeWidth="5"
          strokeMiterlimit="10"
          x1="97.465"
          y1="86.853"
          x2="80.214"
          y2="81.228"
        />
        <path
          fill="#763626"
          d="M71.988,37.382v2.446c0,0.913-0.583,1.688-1.397,1.977v0.818c0,
          1.157-0.938,2.097-2.097,2.097h-6.987c-1.158,0-2.097-0.939-2.097-2.097v-0.818
          c-0.813-0.288-1.397-1.063-1.397-1.977v-2.446c0-0.578,0.47-1.047,
          1.049-1.047H70.94C71.518,36.335,71.988,36.804,71.988,37.382z M59.488,
          33.54c-0.865,0-1.645-0.53-1.954-1.339c-3.391-8.833-7.906-7.942-7.906-16.828
          C49.627,6.883,56.511,0,65,0c8.49,0,15.373,6.883,15.373,15.373c0,8.886-4.516,
          7.995-7.906,16.828c-0.31,0.809-1.089,1.339-1.954,1.339H59.488z M58.012,
          15.373c0-3.853,3.135-6.987,6.987-6.987c0.772,0,1.397-0.626,1.397-1.397
          c0-0.772-0.625-1.398-1.397-1.398c-5.394,0-9.782,4.388-9.782,9.783c0,
          0.771,0.626,1.397,1.397,1.397C57.387,16.77,58.012,16.144,58.012,15.373z"
        />
        <animate
          attributeName="opacity"
          attributeType="CSS"
          begin={dude.startIdea}
          dur={0.1}
          fill="freeze"
          from="0"
          to="0.8"
        />
      </g>,
    );
    const fadeOut = (
      <animate
        attributeName="opacity"
        attributeType="CSS"
        begin={endAnimation}
        dur={1}
        fill="freeze"
        from="1"
        to="0"
      />
    );
    element = [
      <svg
        className="Pipeline-container Pipeline-shadow"
        key="square"
      >
        { svgElement.square }
        { svgElement.dude }
        { fadeOut }
      </svg>,
      <svg
        className="Pipeline-container"
        key="pipeline"
      >
        { svgElement.squares }
        { svgElement.circles }
        { svgElement.text }
        { svgElement.cloud }
        { fadeOut }
      </svg>,
    ];
  }
  return element;
};

Pipeline.defaultProps = {
  end: null,
  rows: null,
  scale: null,
};

Pipeline.propTypes = {
  clouds: PropTypes.shape({
    end: PropTypes.number,
    start: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  draw: PropTypes.bool.isRequired,
  dude: PropTypes.shape({
    startConfused: PropTypes.number,
    durConfused: PropTypes.number,
    startIdea: PropTypes.number,
    x: PropTypes.number,
  }).isRequired,
  endAnimation: PropTypes.number,
  intervals: PropTypes.shape({
    leftSlide: PropTypes.number,
    leftResizeStart: PropTypes.number,
    leftResizeDuration: PropTypes.number,
    rightAppearDelay: PropTypes.number,
    rightResizeDuration: PropTypes.number,
    rightResizeStart: PropTypes.number,
    rightSlide: PropTypes.number,
  }).isRequired,
  path: PropTypes.shape({
    left: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      xP: PropTypes.number,
      yP: PropTypes.number,
    }),
  }).isRequired,
  rows: PropTypes.number,
  square: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

export default Pipeline;
