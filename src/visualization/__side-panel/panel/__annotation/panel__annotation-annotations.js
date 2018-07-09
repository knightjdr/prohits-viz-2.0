import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Input,
  Switch,
} from 'antd';
import {
  faEraser,
  faPlus,
  faTrashAlt,
} from '@fortawesome/pro-solid-svg-icons';

const Annotations = ({
  move,
}) => ([
  <div
    className="panel__annotation-annotations-input"
    key="annotation-input"
  >
    <Input placeholder="Add annotation" />
    <button
      className="panel__annotation-button_theme-default"
      type="button"
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  </div>,
  <div
    className="panel__annotation-annotations-buttons"
    key="annotation-buttons"
  >
    <div>
      Move
    </div>
    <div>
      <Switch checked={move} />
    </div>
    <div>
      Clear last
    </div>
    <div>
      <button
        className="panel__annotation-button_theme-warning"
        type="button"
      >
        <FontAwesomeIcon icon={faEraser} />
      </button>
    </div>
    <div>
      Clear all
    </div>
    <div>
      <button
        className="panel__annotation-button_theme-warning"
        type="button"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  </div>,
]);

Annotations.propTypes = {
  move: PropTypes.bool.isRequired,
};

export default Annotations;
