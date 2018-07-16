import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Select } from 'antd';
import { faSave } from '@fortawesome/pro-solid-svg-icons';

import './panel__save.css';

const { Option } = Select;

const SaveImage = ({
  handleImageType,
  imageType,
  saveImage,
}) => (
  <div className="panel__save-image">
    <Select
      onChange={handleImageType}
      value={imageType}
    >
      <Option value="pdf">PDF</Option>
      <Option value="png">PNG</Option>
      <Option value="svg">SVG</Option>
    </Select>
    <button
      className="panel__save-button-image"
      onClick={saveImage}
      type="button"
    >
      <FontAwesomeIcon icon={faSave} />
    </button>
  </div>
);

SaveImage.propTypes = {
  handleImageType: PropTypes.func.isRequired,
  imageType: PropTypes.string.isRequired,
  saveImage: PropTypes.func.isRequired,
};

export default SaveImage;
