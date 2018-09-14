import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faFileDownload,
  faUndo,
} from '@fortawesome/pro-solid-svg-icons';
import { faComment, faSquare } from '@fortawesome/pro-regular-svg-icons';

import OptionButton from './heatmap-svg__status-button';

const Options = ({
  canTranslate,
  download,
  expand,
  fixLeft,
  reset,
  selectionBoxActive,
  showSelectionToggle,
  toggleSelectionBox,
  toggleTooltips,
  tooltipsActive,
  translate,
}) => (
  <div
    className="heatmap-svg__status-menu"
    style={{
      opacity: expand ? 1 : 0,
      transform: expand ? 'scaleY(1)' : 'scaleY(0)',
    }}
  >
    {
      canTranslate &&
      <OptionButton
        onClick={translate}
        tooltip={fixLeft ? 'Center plot' : 'Fix plot to left'}
      >
        {
          fixLeft ?
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
            :
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        }
      </OptionButton>
    }
    <OptionButton
      className="heatmap-svg__status-button_small-font"
      onClick={reset}
      tooltip="Reset image"
    >
      <FontAwesomeIcon icon={faUndo} />
    </OptionButton>
    <OptionButton
      onClick={download}
      tooltip="Export current view"
    >
      <FontAwesomeIcon icon={faFileDownload} />
    </OptionButton>
    {
      showSelectionToggle &&
      <OptionButton
        onClick={toggleSelectionBox}
        tooltip="Toggle selection box"
      >
        <FontAwesomeIcon
          icon={faSquare}
          style={{
            color: selectionBoxActive ? 'inherit' : '#999',
          }}
        />
        {
          !selectionBoxActive &&
          <span className="heatmap-svg__state-slash">/</span>
        }
      </OptionButton>
    }
    <OptionButton
      onClick={toggleTooltips}
      tooltip="Toggle tooltips"
    >
      <FontAwesomeIcon
        icon={faComment}
        style={{
          color: tooltipsActive ? 'inherit' : '#999',
        }}
      />
      {
        !tooltipsActive &&
        <span className="heatmap-svg__state-slash">/</span>
      }
    </OptionButton>
  </div>
);

Options.defaultProps = {
  toggleSelectionBox: null,
  toggleTooltips: null,
};

Options.propTypes = {
  canTranslate: PropTypes.bool.isRequired,
  download: PropTypes.func.isRequired,
  expand: PropTypes.bool.isRequired,
  fixLeft: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  selectionBoxActive: PropTypes.bool.isRequired,
  showSelectionToggle: PropTypes.bool.isRequired,
  toggleSelectionBox: PropTypes.func,
  toggleTooltips: PropTypes.func,
  tooltipsActive: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired,
};

export default Options;
