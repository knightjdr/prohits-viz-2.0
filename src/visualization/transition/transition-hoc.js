import React, { Component } from 'react';

/* This HOC will set a wrapped components css transition duration to 0
** when mounting and will set it to the prop value or default of 0.5s
** afterwards. */
const TransitionHOC = (WrappedComponent, duration = 0.5) => {
  class TransitionContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        transitionDuration: '0s',
      };
    }
    componentDidMount = () => {
      this.setState({
        transitionDuration: `${duration}s`,
      });
    }
    render() {
      return (
        <WrappedComponent
          transitionDuration={this.state.transitionDuration}
          {...this.props}
        />
      );
    }
  }

  return TransitionContainer;
};

export default TransitionHOC;
