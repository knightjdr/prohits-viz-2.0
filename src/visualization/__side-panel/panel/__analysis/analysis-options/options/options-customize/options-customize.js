import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

import Display from './options-customize__display';
import Order from './options-customize__order';
import Undo from './options-customize__undo';

const Customize = ({
  form,
  handleCheckbox,
  handleSelect,
  undo,
  undoDisabled,
  updateDisabled,
  updateImage,
}) => (
  <div className="analysis-option">
    <div className="analysis-option__help">
      <FontAwesomeIcon icon={faInfoCircle} />{' '}
      <span>
        Created a customized image with the selected genes.
      </span>
    </div>
    <Display
      disabled={updateDisabled}
      handleCheckbox={handleCheckbox}
      removeEmpty={form.removeEmpty}
      resetMaximums={form.resetMaximums}
      update={updateImage}
    />
    <Order
      deleteBy={form.deleteBy}
      handleSelect={handleSelect}
      orderBy={form.orderBy}
    />
    <Undo
      disabled={undoDisabled}
      undo={undo}
    />
  </div>
);

Customize.propTypes = {
  form: PropTypes.shape({
    deleteBy: PropTypes.string,
    orderBy: PropTypes.string,
    removeEmpty: PropTypes.bool,
    resetMaximums: PropTypes.bool,
  }).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  undoDisabled: PropTypes.bool.isRequired,
  updateDisabled: PropTypes.bool.isRequired,
  updateImage: PropTypes.func.isRequired,
};

export default Customize;
