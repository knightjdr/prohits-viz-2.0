import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';

import Button from '../../../../components/button/button';
import Options from './heatmap-svg__status-options';

import './heatmap-svg__status.css';

const Status = ({
  canTranslate,
  download,
  elPosition,
  expand,
  fixLeft,
  reset,
  selectionBoxActive,
  show,
  showToggles,
  toggleMenu,
  toggleSelectionBox,
  toggleTooltips,
  tooltipsActive,
  translate,
}) => (
  <div
    className="heatmap-svg__status"
    style={{
      right: elPosition.right,
      top: elPosition.top,
      visibility: show ? 'visible' : 'hidden',
    }}
  >
    <Button onClick={toggleMenu}>
      <FontAwesomeIcon icon={faEllipsisV} />
    </Button>
    <Options
      canTranslate={canTranslate}
      download={download}
      expand={expand}
      fixLeft={fixLeft}
      reset={reset}
      selectionBoxActive={selectionBoxActive}
      showToggles={showToggles}
      toggleSelectionBox={toggleSelectionBox}
      toggleTooltips={toggleTooltips}
      tooltipsActive={tooltipsActive}
      translate={translate}
    />
  </div>
);

Status.defaultProps = {
  selectionBoxActive: false,
  toggleSelectionBox: null,
  toggleTooltips: null,
  tooltipsActive: false,
};

Status.propTypes = {
  canTranslate: PropTypes.bool.isRequired,
  download: PropTypes.func.isRequired,
  elPosition: PropTypes.shape({
    bottom: PropTypes.number,
    right: PropTypes.number,
    transform: PropTypes.string,
  }).isRequired,
  expand: PropTypes.bool.isRequired,
  fixLeft: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  selectionBoxActive: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  showToggles: PropTypes.bool.isRequired,
  tooltipsActive: PropTypes.bool,
  toggleMenu: PropTypes.func.isRequired,
  toggleSelectionBox: PropTypes.func,
  toggleTooltips: PropTypes.func,
  translate: PropTypes.func.isRequired,
};

export default Status;
