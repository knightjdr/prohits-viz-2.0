import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import HelpNavButtons from './help-nav-buttons';
import HelpRoutesMap from '../help-routes/help-routes-map';

const last = HelpRoutesMap.arr.length - 1;

export class HelpNavButtonsContainer extends Component {
  constructor(props) {
    super(props);
    const index = HelpRoutesMap.arr.indexOf(this.props.location.pathname);
    this.state = {
      navBackward: this.getBackRoute(index),
      navForward: this.getForwardRoute(index),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { location } = nextProps;
    this.updateNavButtons(location.pathname, this.props.location.pathname);
  }
  getBackRoute = index => (
    index === 0 ? null : HelpRoutesMap.arr[index - 1]
  )
  getForwardRoute = index => (
    index === last ? null : HelpRoutesMap.arr[index + 1]
  )
  updateNavButtons = (newPath, oldPath) => {
    if (newPath !== oldPath) {
      const index = HelpRoutesMap.arr.indexOf(newPath);
      this.setState({
        navBackward: this.getBackRoute(index),
        navForward: this.getForwardRoute(index),
      });
    }
  }
  render() {
    return (
      <HelpNavButtons
        navBackward={this.state.navBackward}
        navForward={this.state.navForward}
      />
    );
  }
}

HelpNavButtonsContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(HelpNavButtonsContainer);
