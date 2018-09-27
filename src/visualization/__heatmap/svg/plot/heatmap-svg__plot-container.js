import PropTypes from 'prop-types';
import React, { Component } from 'react';

import colorGradient from '../../../color/color-gradient';
import getPage from './transforms/get-page';
import Plot from './heatmap-svg__plot';
import round from '../../../../helpers/round';
import setRange from './transforms/set-range';
import setEdgeRange from './transforms/set-edge-range';

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
    this.edgeGradient = colorGradient(edgeColor, NUM_COLORS, false);
    this.edgeRange = setEdgeRange(primaryFilter, secondaryFilter, scoreType, 0, NUM_COLORS - 1);
    this.fillGradient = colorGradient(fillColor, NUM_COLORS, invertColor);
    this.fillRange = setRange(minAbundance, abundanceCap, 0, NUM_COLORS - 1);
    this.getPage = getPage(imageType);
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
      this.props.sortID,
      this.props.updateID,
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
      sortID,
      updateID,
    } = nextProps;
    return (
      updateID !== this.props.updateID ||
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
      sortID !== this.props.sortID
    );
  }
  setEdgeSize = cellSize => (
    cellSize < 15 ? round(cellSize / 10, 1) : 1.5
  );
  updateEdgeGradient = ({
    cellSize,
    dimensions,
    edgeColor,
    position,
    rows,
  }, prevEdgeColor) => {
    if (edgeColor !== prevEdgeColor) {
      this.edgeGradient = colorGradient(edgeColor, NUM_COLORS, false);
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
      this.edgeRange = setEdgeRange(primaryFilter, secondaryFilter, scoreType, 0, NUM_COLORS - 1);
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
      this.fillGradient = colorGradient(fillColor, NUM_COLORS, invertColor);
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
      this.fillRange = setRange(minAbundance, abundanceCap, 0, NUM_COLORS - 1);
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
      this.getPage = getPage(imageType);
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
    sortID,
    updateID,
  }, prevPosition, prevDimensions, prevSortId, prevUpdateID) => {
    if (
      updateID !== prevUpdateID ||
      position.x !== prevPosition.x ||
      position.y !== prevPosition.y ||
      dimensions.pageX !== prevDimensions.pageX ||
      dimensions.pageY !== prevDimensions.pageY ||
      sortID !== prevSortId
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

PlotContainer.defaultProps = {
  sortID: null,
  updateID: null,
};

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
  sortID: PropTypes.number,
  updateID: PropTypes.number,
};

export default PlotContainer;
