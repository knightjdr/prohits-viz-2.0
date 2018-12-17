import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import FetchHome from '../../state/get/home-actions';
import Landing from './landing';

export class LandingContainer extends PureComponent {
  componentDidMount = () => {
    this.props.fetchHome();
  }
  render() {
    return (
      <Landing />
    );
  }
}

LandingContainer.propTypes = {
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
)(LandingContainer);

export default ConnectedContainer;
