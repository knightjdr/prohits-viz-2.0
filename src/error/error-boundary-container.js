/* eslint no-console: 0 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Error from './error';
import mailTo from '../helpers/mail-to';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  componentDidCatch = (error, info) => {
    console.error(error, info);
    this.error = error.toString();
    this.info = info.toString();
  }
  getDerivedStateFromError = () => ({
    hasError: true,
  });
  reportError = () => {
    const body = `error: ${this.error}\n\ninfo: ${this.info}`;
    mailTo('ProHits-viz error', body);
  }
  render() {
    if (this.state.hasError) {
      return <Error reportError={this.reportError} />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
