import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ColorGradient from '../../../color/color-gradient';
import DimensionsSelector from '../../../../state/selectors/visualization/dimension-selector';
import GetPage from './transforms/get-page';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import Plot from './heatmap-svg__plot';
import RowsSelector from '../../../../state/selectors/visualization/rows-selector';
import SetRange from './transforms/set-range';
import SettingSelector from '../../../../state/selectors/visualization/settings-selector';
import SortSeletor from '../../../../state/selectors/visualization/sort-selector';

const NUM_COLORS = 100;

export class PlotContainer extends Component {
  constructor(props) {
    super(props);
    const {
      abundanceCap,
      dimensions,
      fillColor,
      minAbundance,
      rows,
      position,
    } = this.props;
    this.gradient = ColorGradient(fillColor, NUM_COLORS, false);
    this.range = SetRange(minAbundance, abundanceCap, 0, NUM_COLORS);
    this.state = {
      page: GetPage(rows, position, dimensions, this.gradient, this.range),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateGradient(nextProps, this.props.fillColor);
    this.updatePage(
      nextProps,
      this.props.position,
      this.props.dimensions,
      this.props.sortInfo.id,
    );
    this.updateRange(nextProps, this.props.minAbundance, this.props.abundanceCap);
  }
  updateGradient = ({
    dimensions,
    fillColor,
    position,
    rows,
  }, prevFillColor) => {
    if (fillColor !== prevFillColor) {
      this.gradient = ColorGradient(fillColor, NUM_COLORS, false);
      this.setState({
        page: GetPage(rows, position, dimensions, this.gradient, this.range),
      });
    }
  }
  updatePage = ({
    dimensions,
    position,
    rows,
    sortInfo,
  }, prevPosition, prevDimensions, prevSortId) => {
    if (
      position.x !== prevPosition.x ||
      position.y !== prevPosition.y ||
      dimensions.x !== prevDimensions.x ||
      dimensions.y !== prevDimensions.y ||
      sortInfo.id !== prevSortId
    ) {
      this.setState({
        page: GetPage(rows, position, dimensions, this.gradient, this.range),
      });
    }
  }
  updateRange = ({
    abundanceCap,
    dimensions,
    minAbundance,
    position,
    rows,
  }, prevMinAbundance, prevAbundanceCap) => {
    if (
      minAbundance !== prevMinAbundance ||
      abundanceCap !== prevAbundanceCap
    ) {
      this.range = SetRange(minAbundance, abundanceCap, 0, NUM_COLORS);
      this.setState({
        page: GetPage(rows, position, dimensions, this.gradient, this.range),
      });
    }
  }
  render() {
    return (
      <Plot
        cellSize={this.props.cellSize}
        page={this.state.page}
      />
    );
  }
}

PlotContainer.defaultProps = {
  cellSize: 20,
};

PlotContainer.propTypes = {
  abundanceCap: PropTypes.number.isRequired,
  cellSize: PropTypes.number,
  dimensions: PropTypes.shape({
    pageX: PropTypes.number,
    pageY: PropTypes.number,
  }).isRequired,
  fillColor: PropTypes.string.isRequired,
  minAbundance: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number,
        }),
      ),
      name: PropTypes.string,
    }),
  ).isRequired,
  sortInfo: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  abundanceCap: SettingSelector(state, 'abundanceCap'),
  cellSize: SettingSelector(state, 'cellSize'),
  dimensions: DimensionsSelector(state),
  fillColor: SettingSelector(state, 'fillColor'),
  minAbundance: SettingSelector(state, 'minAbundance'),
  position: PositionSelector(state),
  rows: RowsSelector(state),
  sortInfo: SortSeletor(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(PlotContainer);

export default ConnectedContainer;
