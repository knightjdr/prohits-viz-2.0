import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import taskSelector from '../state/selectors/task-selector';

const SMALL_SCREEN_SIZE = 680;

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
    const isSmall = window.innerWidth <= SMALL_SCREEN_SIZE;
    return isSmall;
  }
  render() {
    return (
      <Navbar
        background={this.props.background}
        fixed={this.props.fixed}
        links={this.props.links}
        smallScreen={this.state.isSmallScreen}
        tasks={this.props.tasks.list}
      />
    );
  }
}

NavbarContainer.defaultProps = {
  background: true,
  fixed: false,
  links: [],
};

NavbarContainer.propTypes = {
  background: PropTypes.bool,
  fixed: PropTypes.bool,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  tasks: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.string,
    ),
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  tasks: taskSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(NavbarContainer);

export default ConnectedContainer;
