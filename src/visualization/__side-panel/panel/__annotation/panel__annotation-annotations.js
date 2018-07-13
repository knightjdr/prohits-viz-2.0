import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { ChromePicker } from 'react-color';
import {
  Input,
  Switch,
} from 'antd';
import {
  faEraser,
  faPalette,
  faPlus,
  faTrashAlt,
} from '@fortawesome/pro-solid-svg-icons';

import ClickOutside from '../../../../components/click-outside/click-outside';

const showPicker = {
  false: {
    opacity: 0,
    transform: 'scale(0)',
    visibility: 'hidden',
  },
  true: {
    opacity: 1,
    transform: 'scale(1)',
    visibility: 'visible',
  },
};

const Annotations = ({
  addAnnotation,
  annotation,
  annotationColor,
  clearAllAnnotations,
  clearLastAnnotation,
  closeAnnotationColorPicker,
  handleAnnotationColor,
  move,
  showAnnotationPicker,
  toggleAnnotationColorPicker,
  toggleMove,
  updateAnnotation,
}) => (
  <div className="panel__annotation-annotations">
    <div className="panel__annotation-annotations-input">
      <Input
        onChange={updateAnnotation}
        placeholder="Add annotation"
        value={annotation}
      />
      <button
        className="panel__annotation-button_theme-default"
        onClick={addAnnotation}
        type="button"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
    <div className="panel__annotation-annotations-buttons">
      <div>
        Annotation color
      </div>
      <div>
        <button
          className="panel__annotation-button_theme-default"
          onClick={toggleAnnotationColorPicker}
          type="button"
        >
          <FontAwesomeIcon icon={faPalette} />
        </button>
      </div>
      <div>
        Move
      </div>
      <div>
        <Switch
          checked={move}
          onChange={toggleMove}
        />
      </div>
      <div>
        Clear last
      </div>
      <div>
        <button
          className="panel__annotation-button_theme-warning"
          onClick={clearLastAnnotation}
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
          onClick={clearAllAnnotations}
          type="button"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
    <div
      className="panel__annotation-annotations-color-picker"
      style={showPicker[showAnnotationPicker]}
    >
      <ClickOutside
        callback={closeAnnotationColorPicker}
      >
        <ChromePicker
          color={annotationColor}
          disableAlpha
          onChangeComplete={handleAnnotationColor}
        />
      </ClickOutside>
    </div>
  </div>
);

Annotations.propTypes = {
  addAnnotation: PropTypes.func.isRequired,
  annotation: PropTypes.string.isRequired,
  annotationColor: PropTypes.string.isRequired,
  clearAllAnnotations: PropTypes.func.isRequired,
  clearLastAnnotation: PropTypes.func.isRequired,
  closeAnnotationColorPicker: PropTypes.func.isRequired,
  handleAnnotationColor: PropTypes.func.isRequired,
  move: PropTypes.bool.isRequired,
  showAnnotationPicker: PropTypes.bool.isRequired,
  toggleAnnotationColorPicker: PropTypes.func.isRequired,
  toggleMove: PropTypes.func.isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default Annotations;
