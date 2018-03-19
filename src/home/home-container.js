import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FetchHome from '../state/get/home-actions';
import Home from './home';

export class HomeContainer extends Component {
  componentDidMount = () => {
    this.getHomeContent();
  }
  getHomeContent = () => {
    this.props.fetchHome();
  }
  render() {
    return (
      <Home />
    );
  }
}

HomeContainer.propTypes = {
  fetchHome: PropTypes.func.isRequired,
};

/* istanbul ignore next */

const mapDispatchToProps = dispatch => ({
  fetchHome: () => {
    dispatch(FetchHome());
  },
});

const ConnectedContainer = connect(
  null,
  mapDispatchToProps,
)(HomeContainer);

export default ConnectedContainer;
