import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FetchHome from '../state/get/home-actions';
import Home from './home';
import IsLoadedSelector from '../state/selectors/home-loaded-selector';

export class HomeContainer extends Component {
  componentDidMount = () => {
    this.getHomeContent();
  }
  getHomeContent = () => {
    if (!this.props.isLoaded) {
      this.props.fetchHome();
    }
  }
  render() {
    return (
      <Home />
    );
  }
}

HomeContainer.propTypes = {
  fetchHome: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchHome: () => {
    dispatch(FetchHome());
  },
});

const mapStateToProps = state => ({
  isLoaded: IsLoadedSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);

export default ConnectedContainer;
