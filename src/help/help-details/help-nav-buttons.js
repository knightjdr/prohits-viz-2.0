import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-solid-svg-icons';

import './help-nav-buttons.css';

const HelpNavButtons = ({
  navBackward,
  navForward,
}) => (
  <div className="help__nav-buttons">
    {
      navBackward &&
      <Button
        className="help__nav-backward"
        type="primary"
      >
        <NavLink to={navBackward}>
          <Icon>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Icon>
          <span className="help__nav-backward-text">
            Backward
          </span>
        </NavLink>
      </Button>
    }
    {
      navForward &&
      <Button
        className="help__nav-forward"
        type="primary"
      >
        <NavLink to={navForward}>
          <span className="help__nav-forward-text">
            Forward
          </span>
          <Icon>
            <FontAwesomeIcon icon={faChevronRight} />
          </Icon>
        </NavLink>
      </Button>
    }
  </div>
);

HelpNavButtons.defaultProps = {
  navBackward: null,
  navForward: null,
};

HelpNavButtons.propTypes = {
  navBackward: PropTypes.string,
  navForward: PropTypes.string,
};

export default HelpNavButtons;
