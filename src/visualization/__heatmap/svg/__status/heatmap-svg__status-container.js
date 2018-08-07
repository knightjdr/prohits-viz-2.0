import PropTypes from 'prop-types';
import React, { Component } from 'react';

import OnResize from '../../../../helpers/on-resize';
import Status from './heatmap-svg__status';

export class StatusContainer extends Component {
  constructor(props) {
    super(props);
    const { width } = this.props;
    this.state = {
      elPosition: this.setPosition(width),
      show: true,
    };
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.onResize);
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateElPosition(nextProps, this.props.width);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    this.setState({ show: false });
    OnResize(this, this.resizeEnd, 800);
  }
  setPosition = width => ({
    right: (((window.innerWidth - 50) - width) / 2) - 35,
    top: 105,
  })
  resizeEnd = () => {
    const { width } = this.props;
    this.setState({
      elPosition: this.setPosition(width),
    });
  }
  updateElPosition = ({ width }, prevWidth) => {
    if (width !== prevWidth) {
      this.setState({
        elPosition: this.setPosition(width),
      });
    }
  }
  render() {
    return (
      <Status
        elPosition={this.state.elPosition}
        fixLeft={this.props.fixLeft}
        show={this.state.show}
        translate={this.props.translate}
      />
    );
  }
}

StatusContainer.propTypes = {
  fixLeft: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export default StatusContainer;
