import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronLeft from '@fortawesome/fontawesome-pro-solid/faChevronLeft';
import faChevronRight from '@fortawesome/fontawesome-pro-solid/faChevronRight';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

import './help-nav-buttons.css';

const HelpNavButtons = ({
  navBackward,
  navForward,
}) => (
  <div className="HelpNavButtons-container">
    {
      navBackward &&
      <Button
        className="HelpNavButtons-backward"
        type="primary"
      >
        <NavLink to={navBackward}>
          <Icon>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Icon>
          <span className="HelpNavButtons-backward-text">
            Backward
          </span>
        </NavLink>
      </Button>
    }
    {
      navForward &&
      <Button
        className="HelpNavButtons-forward"
        type="primary"
      >
        <NavLink to={navForward}>
          <span className="HelpNavButtons-forward-text">
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
