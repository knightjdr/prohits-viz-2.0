import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ContextMenuWrapper from './context-menu';

const ContextMenu = (WrappedComponent) => {
  class _ContextMenu extends Component {
    constructor(props) {
      super(props);
      const { event, show } = this.props;
      this.menuRef = React.createRef();
      this.state = {
        height: show ? 'auto' : 0,
        left: show ? this.setLeft(event) : 0,
        top: show ? this.setTop(event) : 0,
      };
    }
    componentWillReceiveProps = (nextProps) => {
      this.updateMenu(nextProps, this.props.show);
    }
    setLeft = (x) => {
      const limitLeft = window.innerWidth - this.menuRef.current.getBoundingClientRect().width;
      return x > limitLeft ? limitLeft : x;
    }
    setTop = (y) => {
      const limitTop = window.innerHeight - this.menuRef.current.getBoundingClientRect().height;
      return y > limitTop ? limitTop : y;
    }
    updateMenu = ({ event, show }, prevShow) => {
      if (show !== prevShow) {
        this.setState({
          height: show ? 'auto' : 0,
          left: show ? this.setLeft(event.clientX) : 0,
          top: show ? this.setTop(event.clientY) : 0,
        });
      }
    }
    render() {
      const { children, closeMenu, ...otherProps } = this.props;
      return (
        <ContextMenuWrapper
          closeMenu={closeMenu}
          height={this.state.height}
          left={this.state.left}
          setRef={this.menuRef}
          show={this.props.show}
          top={this.state.top}
        >
          <WrappedComponent
            closeMenu={closeMenu}
            {...otherProps}
          >
            {children}
          </WrappedComponent>
        </ContextMenuWrapper>
      );
    }
  }

  _ContextMenu.defaultProps = {
    event: null,
    children: null,
  };

  _ContextMenu.propTypes = {
    children: PropTypes.shape({}),
    closeMenu: PropTypes.func.isRequired,
    event: PropTypes.shape({}),
    show: PropTypes.bool.isRequired,
  };

  return _ContextMenu;
};

export default ContextMenu;
