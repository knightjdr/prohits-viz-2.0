import ClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ContextMenu from './context-menu';

class ContextMenuContainer extends Component {
  handleClickOutside = () => {
    this.props.closeMenu();
  };
  render() {
    return (
      <ContextMenu
        canPaste={this.props.canPaste}
        left={this.props.left}
        show={this.props.show}
        top={this.props.top}
      />
    );
  }
}

ContextMenuContainer.defaultProps = {
  canPaste: false,
  left: 0,
  show: false,
  top: 0,
};

ContextMenuContainer.propTypes = {
  canPaste: PropTypes.bool,
  closeMenu: PropTypes.func.isRequired,
  left: PropTypes.number,
  show: PropTypes.bool,
  top: PropTypes.number,
};

export default ClickOutside(ContextMenuContainer);
