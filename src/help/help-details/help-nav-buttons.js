import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronLeft from '@fortawesome/fontawesome-pro-solid/faChevronLeft';
import faChevronRight from '@fortawesome/fontawesome-pro-solid/faChevronRight';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon } from 'antd';

import './help-nav-buttons.css';

const HelpNavButtons = ({
  index,
  length,
}) => (
  <div className="HelpNavButtons-container">
    {
      index > 0 &&
      <Button
        className="HelpNavButtons-backward"
        type="primary"
      >
        <Icon>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Icon>
        Backward
      </Button>
    }
    {
      index < length &&
      <Button
        className="HelpNavButtons-forward"
        type="primary"
      >
        Forward
        <Icon>
          <FontAwesomeIcon icon={faChevronRight} />
        </Icon>
      </Button>
    }
  </div>
);

HelpNavButtons.propTypes = {
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

export default HelpNavButtons;
