import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';
import { faChevronSquareDown } from '@fortawesome/pro-solid-svg-icons';

import TreeRoutes from './tree-routes-container';

import './help-bar.css';

const HelpBar = ({
  isPanelVisible,
  isSmallScreen,
  showPanel,
}) => {
  let breadcrumbClass = '';
  let buttonClass = '';
  let panelClass = '';
  if (
    isSmallScreen &&
    isPanelVisible
  ) {
    breadcrumbClass = 'help__bar-breadcrumb-transition-in';
    buttonClass = 'help__bar-button-transition-in';
    panelClass = 'help__bar-panel-transition-in';
  } else if (
    isSmallScreen &&
    !isPanelVisible
  ) {
    breadcrumbClass = 'help__bar-breadcrumb-transition-out';
    buttonClass = 'help__bar-button-transition-out';
    panelClass = 'help__bar-panel-transition-out';
  }
  return (
    <div className="help__bar">
      <div className={`help__bar-panel ${panelClass}`}>
        <div className={`help__bar-breadcrumb ${breadcrumbClass}`}>
          <TreeRoutes />
        </div>
      </div>
      <Button
        className={`help__bar-button ${buttonClass}`}
        onClick={showPanel}
        shape="circle"
        type="primary"
      >
        <FontAwesomeIcon
          icon={faChevronSquareDown}
          transform={isPanelVisible ? { rotate: 90 } : { rotate: 270 }}
        />
      </Button>
    </div>
  );
};

HelpBar.defaultProps = {
  isPanelVisible: false,
  isSmallScreen: false,
};

HelpBar.propTypes = {
  isPanelVisible: PropTypes.bool,
  isSmallScreen: PropTypes.bool,
  showPanel: PropTypes.func.isRequired,
};

export default HelpBar;
