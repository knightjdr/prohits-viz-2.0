import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ColorGradient from '../../../color/color-gradient';
import DimensionsSelector from '../../../../state/selectors/visualization/dimension-selector';
import GetPage from './transforms/get-page';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import Plot from './heatmap-svg__plot';
import Round from '../../../../helpers/round';
import RowsSelector from '../../../../state/selectors/visualization/rows-selector';
import SetRange from './transforms/set-range';
import SetEdgeRange from './transforms/set-edge-range';
import SettingSelector from '../../../../state/selectors/visualization/settings-selector';
import SortSeletor from '../../../../state/selectors/visualization/sort-selector';
import { ParametersSelectorProp } from '../../../../state/selectors/visualization/params-selector';

const NUM_COLORS = 101;

export class PlotContainer extends Component {
  constructor(props) {
    super(props);
    const {
      abundanceCap,
      cellSize,
      dimensions,
      edgeColor,
      fillColor,
      imageType,
      invertColor,
      minAbundance,
      rows,
      position,
      primaryFilter,
      scoreType,
      secondaryFilter,
    } = this.props;
    this.edgeGradient = ColorGradient(edgeColor, NUM_COLORS, false);
    this.edgeRange = SetEdgeRange(primaryFilter, secondaryFilter, scoreType, 0, NUM_COLORS - 1);
    this.fillGradient = ColorGradient(fillColor, NUM_COLORS, invertColor);
    this.fillRange = SetRange(minAbundance, abundanceCap, 0, NUM_COLORS - 1);
    this.getPage = GetPage(imageType);
    this.state = {
      edgeSize: this.setEdgeSize(cellSize),
      page: this.getPage(
        rows,
        position,
        dimensions,
        cellSize,
        this.edgeGradient,
        this.fillGradient,
        this.edgeRange,
        this.fillRange,
      ),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.updateEdgeGradient(nextProps, this.props.edgeColor);
    this.updateEdgeRange(nextProps, this.props.primaryFilter, this.props.secondaryFilter);
    this.updateEdgeSize(nextProps, this.props.cellSize);
    this.updateFillGradient(nextProps, this.props.fillColor, this.props.invertColor);
    this.updateFillRange(nextProps, this.props.minAbundance, this.props.abundanceCap);
    this.updateImageType(nextProps, this.props.imageType);
    this.updatePage(
      nextProps,
      this.props.position,
      this.props.dimensions,
      this.props.sortInfo.id,
    );
  }
  shouldComponentUpdate(nextProps) {
    const {
      abundanceCap,
      cellSize,
      dimensions,
      edgeColor,
      fillColor,
      imageType,
      invertColor,
      minAbundance,
      position,
      primaryFilter,
      secondaryFilter,
      sortInfo,
    } = nextProps;
    return (
      abundanceCap !== this.props.abundanceCap ||
      cellSize !== this.props.cellSize ||
      dimensions.pageX !== this.props.dimensions.pageX ||
      dimensions.pageY !== this.props.dimensions.pageY ||
      edgeColor !== this.props.edgeColor ||
      fillColor !== this.props.fillColor ||
      imageType !== this.props.imageType ||
      invertColor !== this.props.invertColor ||
      minAbundance !== this.props.minAbundance ||
      position.x !== this.props.position.x ||
      position.y !== this.props.position.y ||
      primaryFilter !== this.props.primaryFilter ||
      secondaryFilter !== this.props.secondaryFilter ||
      sortInfo.id !== this.props.sortInfo.id
    );
  }
  setEdgeSize = cellSize => (
    cellSize < 15 ? Round(cellSize / 10, 1) : 1.5
  );
  updateEdgeGradient = ({
    cellSize,
    dimensions,
    edgeColor,
    position,
    rows,
  }, prevEdgeColor) => {
    if (edgeColor !== prevEdgeColor) {
      this.edgeGradient = ColorGradient(edgeColor, NUM_COLORS, false);
      this.setState({
        page: this.getPage(
          rows,
          position,
          dimensions,
          cellSize,
          this.edgeGradient,
          this.fillGradient,
          this.edgeRange,
          this.fillRange,
        ),
      });
    }
  }
  updateEdgeRange = ({
    cellSize,
    dimensions,
    position,
    rows,
    primaryFilter,
    scoreType,
    secondaryFilter,
  }, prevPrimaryFilter, prevSecondaryFilter) => {
    if (
      primaryFilter !== prevPrimaryFilter ||
      secondaryFilter !== prevSecondaryFilter
    ) {
      this.edgeRange = SetEdgeRange(primaryFilter, secondaryFilter, scoreType, 0, NUM_COLORS - 1);
      this.setState({
        page: this.getPage(
          rows,
          position,
          dimensions,
          cellSize,
          this.edgeGradient,
          this.fillGradient,
          this.edgeRange,
          this.fillRange,
        ),
      });
    }
  }
  updateEdgeSize = ({ cellSize }, prevCellSize) => {
    if (cellSize !== prevCellSize) {
      this.setState({
        edgeSize: this.setEdgeSize(cellSize),
      });
    }
  };
  updateFillGradient = ({
    cellSize,
    dimensions,
    fillColor,
    invertColor,
    position,
    rows,
  }, prevFillColor, prevInvertColor) => {
    if (
      fillColor !== prevFillColor ||
      invertColor !== prevInvertColor
    ) {
      this.fillGradient = ColorGradient(fillColor, NUM_COLORS, invertColor);
      this.setState({
        page: this.getPage(
          rows,
          position,
          dimensions,
          cellSize,
          this.edgeGradient,
          this.fillGradient,
          this.edgeRange,
          this.fillRange,
        ),
      });
    }
  }
  updateFillRange = ({
    abundanceCap,
    cellSize,
    dimensions,
    minAbundance,
    position,
    rows,
  }, prevMinAbundance, prevAbundanceCap) => {
    if (
      minAbundance !== prevMinAbundance ||
      abundanceCap !== prevAbundanceCap
    ) {
      this.fillRange = SetRange(minAbundance, abundanceCap, 0, NUM_COLORS - 1);
      this.setState({
        page: this.getPage(
          rows,
          position,
          dimensions,
          cellSize,
          this.edgeGradient,
          this.fillGradient,
          this.edgeRange,
          this.fillRange,
        ),
      });
    }
  }
  updateImageType = ({
    cellSize,
    dimensions,
    imageType,
    position,
    rows,
  }, prevImageType) => {
    if (imageType !== prevImageType) {
      this.getPage = GetPage(imageType);
      this.setState({
        page: this.getPage(
          rows,
          position,
          dimensions,
          cellSize,
          this.edgeGradient,
          this.fillGradient,
          this.edgeRange,
          this.fillRange,
        ),
      });
    }
  }
  updatePage = ({
    cellSize,
    dimensions,
    position,
    rows,
    sortInfo,
  }, prevPosition, prevDimensions, prevSortId) => {
    if (
      position.x !== prevPosition.x ||
      position.y !== prevPosition.y ||
      dimensions.pageX !== prevDimensions.pageX ||
      dimensions.pageY !== prevDimensions.pageY ||
      sortInfo.id !== prevSortId
    ) {
      this.setState({
        page: this.getPage(
          rows,
          position,
          dimensions,
          cellSize,
          this.edgeGradient,
          this.fillGradient,
          this.edgeRange,
          this.fillRange,
        ),
      });
    }
  }
  render() {
    return (
      <Plot
        cellSize={this.props.cellSize}
        edgeSize={this.state.edgeSize}
        imageType={this.props.imageType}
        page={this.state.page}
      />
    );
  }
}

PlotContainer.propTypes = {
  abundanceCap: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  dimensions: PropTypes.shape({
    pageX: PropTypes.number,
    pageY: PropTypes.number,
  }).isRequired,
  edgeColor: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
  imageType: PropTypes.string.isRequired,
  invertColor: PropTypes.bool.isRequired,
  minAbundance: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  primaryFilter: PropTypes.number.isRequired,
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
  scoreType: PropTypes.string.isRequired,
  secondaryFilter: PropTypes.number.isRequired,
  sortInfo: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  abundanceCap: SettingSelector(state, 'abundanceCap'),
  cellSize: SettingSelector(state, 'cellSize'),
  dimensions: DimensionsSelector(state),
  edgeColor: SettingSelector(state, 'edgeColor'),
  fillColor: SettingSelector(state, 'fillColor'),
  imageType: SettingSelector(state, 'imageType'),
  invertColor: SettingSelector(state, 'invertColor'),
  minAbundance: SettingSelector(state, 'minAbundance'),
  position: PositionSelector(state),
  primaryFilter: SettingSelector(state, 'primaryFilter'),
  rows: RowsSelector(state),
  scoreType: ParametersSelectorProp(state, 'scoreType'),
  secondaryFilter: SettingSelector(state, 'secondaryFilter'),
  sortInfo: SortSeletor(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(PlotContainer);

export default ConnectedContainer;
