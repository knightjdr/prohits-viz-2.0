import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Select } from 'antd';
import {
  faExclamationTriangle,
  faSave,
  faSpinner,
} from '@fortawesome/pro-solid-svg-icons';

import Button from '../../../../components/button/button';

import './panel__save.css';

const { Option } = Select;

const SaveImage = ({
  handleImageType,
  imageType,
  isSaving,
  saveError,
  saveImage,
}) => (
  <Fragment>
    <div className="panel__save-image">
      <Select
        onChange={handleImageType}
        value={imageType}
      >
        <Option value="pdf">PDF</Option>
        <Option value="png">PNG</Option>
        <Option value="svg">SVG</Option>
      </Select>
      <Button
        className="panel__save-button-image"
        onClick={saveImage}
        type="default"
      >
        <FontAwesomeIcon
          icon={isSaving ? faSpinner : faSave}
          spin={isSaving}
        />
      </Button>
    </div>
    {
      isSaving &&
      <div className="panel__save-notification">
        Saving image...
      </div>
    }
    {
      saveError &&
      <div className="panel__save-notification panel__save-warning">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <div>
          There was an error saving the image...
        </div>
      </div>
    }
  </Fragment>
);

SaveImage.propTypes = {
  handleImageType: PropTypes.func.isRequired,
  imageType: PropTypes.string.isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.bool.isRequired,
  saveImage: PropTypes.func.isRequired,
};

export default SaveImage;
