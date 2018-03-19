import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Navbar from './navbar';

const smallScreenSize = 680;

class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSmallScreen: this.smallScreen(),
    };
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    this.setState({
      isSmallScreen: this.smallScreen(),
    });
  }
  smallScreen = () => {
    const isSmall = window.innerWidth <= smallScreenSize;
    return isSmall;
  }
  render() {
    return (
      <Navbar
        background={this.props.background}
        links={this.props.links}
        smallScreen={this.state.isSmallScreen}
      />
    );
  }
}

NavbarContainer.defaultProps = {
  background: true,
  links: [],
};

NavbarContainer.propTypes = {
  background: PropTypes.bool,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
};

export default NavbarContainer;
