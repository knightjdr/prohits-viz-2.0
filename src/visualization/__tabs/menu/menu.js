import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {
  faImage,
  faHandScissors,
  faHighlighter,
  faRectangleWide,
  faTimes,
} from '@fortawesome/pro-regular-svg-icons';

import ClickOutside from '../../../components/click-outside/click-outside';

import './menu.css';

const tabText = {
  customize: <span><FontAwesomeIcon icon={faHandScissors} /><span>Customization</span></span>,
  domain: <span><FontAwesomeIcon icon={faRectangleWide} style={{ marginTop: 5 }} /><span>Domain analysis</span></span>,
  go: <span><FontAwesomeIcon icon={faHighlighter} /><span>GO enrichment</span></span>,
  main: <span><FontAwesomeIcon icon={faImage} /><span>Image</span></span>,
};

const textTransform = (name, selected) => ({
  fontWeight: name === selected ? 600 : 400,
  textTransform: name === selected ? 'uppercase' : 'none',
});

const Menu = ({
  activeTab,
  closeMenu,
  handleClick,
  removeTab,
  show,
  tabs,
}) => (
  <ClickOutside callback={show ? closeMenu : null}>
    <div
      className="tab-menu"
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transform: show ? 'scaleY(1)' : 'scaleY(0)',
        visibility: show ? 'visible' : 'hidden',
      }}
    >
      <div className="tab-menu__inner">
        {
          tabs.map((tab, index) => (
            <Fragment key={tab}>
              <button
                className="tab-menu__button"
                key={`${tab}-button`}
                onClick={() => { handleClick(tab); }}
                style={{
                  ...textTransform(tab, activeTab),
                  gridColumn: 1,
                  gridRow: index + 1,
                }}
                type="button"
              >
                { tabText[tab] }
              </button>
              <button
                className={tab === 'main' ? 'tab-menu__remove tab-menu__remove_hidden' : 'tab-menu__remove'}
                key={`${tab}-remove`}
                onClick={() => { removeTab(tab); }}
                style={{
                  gridColumn: 2,
                  gridRow: index + 1,
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </Fragment>
          ))
        }
      </div>
    </div>
  </ClickOutside>
);

Menu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  removeTab: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Menu;
