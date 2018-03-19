import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronSquareDown from '@fortawesome/fontawesome-pro-solid/faChevronSquareDown';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';

import TreeRoutes from './tree-routes';

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
    breadcrumbClass = 'HelpBar-breadcrumb-transition-in';
    buttonClass = 'HelpBar-button-transition-in';
    panelClass = 'HelpBar-panel-transition-in';
  } else if (
    isSmallScreen &&
    !isPanelVisible
  ) {
    breadcrumbClass = 'HelpBar-breadcrumb-transition-out';
    buttonClass = 'HelpBar-button-transition-out';
    panelClass = 'HelpBar-panel-transition-out';
  }
  return (
    <div className="HelpBar-container">
      <div className={`HelpBar-panel boxshadow ${panelClass}`}>
        <div className={`HelpBar-breadcrumb ${breadcrumbClass}`}>
          <TreeRoutes />
        </div>
      </div>
      <Button
        className={`HelpBar-button ${buttonClass}`}
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
