import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Arrows from './heatmap-svg__arrows';
import DimensionSelector from '../../../../state/selectors/visualization/dimension-selector';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import Round from '../../../../helpers/round';
import SettingSelector from '../../../../state/selectors/visualization/settings-selector';
import { updatePosition } from '../../../../state/set/visualization/position-actions';

export class ArrowsContainer extends Component {
  constructor(props) {
    super(props);
    const {
      dimension,
      direction,
      height,
      width,
    } = this.props;
    this.state = {
      length: direction === 'horizontal' ? dimension.columns : dimension.rows,
      page: direction === 'horizontal' ? dimension.pageX : dimension.pageY,
      position: this.setPosition(direction, height.wrapper, width.wrapper),
    };
  }
  setPosition = (direction, height, width) => (
    direction === 'horizontal' ?
      {
        bottom: window.innerHeight - height - 55,
        right: ((window.innerWidth - width) / 2) + 15,
        transform: 'rotate(-90deg)',
      }
      :
      {
        bottom: window.innerHeight - height - 45,
        right: ((window.innerWidth - width) / 2) - 15,
        transform: null,
      }
  )
  nextRow = (change) => {
    const y = Round((change / this.state.length) + this.props.position.y, 4);
    if (y >= 0 && y <= 1) {
      this.props.updatePosition(this.props.position.x, y);
    }
  }
  render() {
    return (
      <Arrows
        nextRow={this.nextRow}
        position={this.state.position}
      />
    );
  }
}

ArrowsContainer.defaultProps = {
  cellSize: 20,
  direction: 'vertical',
};

ArrowsContainer.propTypes = {
  cellSize: PropTypes.number,
  dimension: PropTypes.shape({
    columns: PropTypes.number,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    rows: PropTypes.number,
  }).isRequired,
  direction: PropTypes.string,
  height: PropTypes.shape({
    wrapper: PropTypes.number,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  updatePosition: PropTypes.func.isRequired,
  width: PropTypes.shape({
    wrapper: PropTypes.number,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  dimension: DimensionSelector(state),
  cellSize: SettingSelector(state, 'cellSize'),
  position: PositionSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  updatePosition: (x, y) => {
    dispatch(updatePosition(x, y));
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArrowsContainer);

export default ConnectedContainer;
