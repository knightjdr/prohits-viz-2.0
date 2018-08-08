import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import OnResize from '../../../../helpers/on-resize';
import Status from './heatmap-svg__status';
import { DisplaySelector } from '../../../../state/selectors/visualization/display-selector';
import { toggleSelectionBox, toggleTooltips } from '../../../../state/set/visualization/display-actions';

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
      show: true,
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
        selectionBoxActive={this.props.display.selectionBox}
        show={this.state.show}
        toggleSelectionBox={this.props.toggleSelectionBox}
        toggleTooltips={this.props.toggleTooltips}
        tooltipsActive={this.props.display.tooltips}
        translate={this.props.translate}
      />
    );
  }
}

StatusContainer.propTypes = {
  display: PropTypes.shape({
    selectionBox: PropTypes.bool,
    tooltips: PropTypes.bool,
  }).isRequired,
  fixLeft: PropTypes.bool.isRequired,
  toggleSelectionBox: PropTypes.func.isRequired,
  toggleTooltips: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  display: DisplaySelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  toggleSelectionBox: () => {
    dispatch(toggleSelectionBox());
  },
  toggleTooltips: () => {
    dispatch(toggleTooltips());
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusContainer);

export default ConnectedContainer;
