import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DimensionsSelector from '../../../../state/selectors/visualization/dimension-selector';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import RowNameSelector from '../../../../state/selectors/visualization/row-name-selector';
import Rows from './heatmap-svg__rows';
import SettingSelector from '../../../../state/selectors/visualization/settings-selector';
import SortSeletor from '../../../../state/selectors/visualization/sort-selector';
import TrimText from '../helpers/trim-text';

export class RowsContainer extends Component {
  constructor(props) {
    super(props);
    const {
      cellSize,
      dimensions,
      rows,
      position,
    } = this.props;
    const fontSize = this.fontSize(cellSize);
    this.state = {
      fontSize,
      names: this.checkRowSize(
        this.getPage(rows, position.y, dimensions.pageY),
        fontSize,
      ),
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const {
      cellSize,
      dimensions,
      position,
      rows,
      sortInfo,
    } = nextProps;
    this.updateFontSize(cellSize, this.props.cellSize, rows);
    this.updatePage(
      position.y,
      this.props.position.y,
      dimensions.pageY,
      this.props.dimensions.pageY,
      sortInfo.id,
      this.props.sortInfo.id,
      rows,
    );
  }
  getPage = (rows, y, pageY) => {
    const pageStart = y * rows.length;
    const pageEnd = pageStart + pageY;
    return rows.slice(pageStart, pageEnd);
  }
  checkRowSize = (names, fontSize) => (
    names.map(name => TrimText(name, 'BodyText', `${fontSize}px`, 98))
  )
  fontSize = cellSize => cellSize * 0.6
  updateFontSize = (cellSize, prevCellSize, rows) => {
    if (cellSize !== prevCellSize) {
      const fontSize = this.fontSize(cellSize);
      this.setState({
        fontSize,
        names: this.checkRowSize(rows, fontSize),
      });
    }
  }
  updatePage = (y, prevY, pageY, prevPageY, sortId, prevSortId, rows) => {
    if (
      y !== prevY ||
      pageY !== prevPageY ||
      sortId !== prevSortId
    ) {
      this.setState(({ fontSize }) => ({
        names: this.checkRowSize(
          this.getPage(rows, y, pageY),
          fontSize,
        ),
      }));
    }
  }
  render() {
    return (
      <Rows
        cellSize={this.props.cellSize}
        fontSize={this.state.fontSize}
        names={this.state.names}
        openContextMenu={this.props.openContextMenu}
        toggleTooltip={this.props.toggleTooltip}
      />
    );
  }
}

RowsContainer.defaultProps = {
  cellSize: 20,
};

RowsContainer.propTypes = {
  cellSize: PropTypes.number,
  dimensions: PropTypes.shape({
    pageY: PropTypes.number,
  }).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  position: PropTypes.shape({
    y: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortInfo: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  cellSize: SettingSelector(state, 'cellSize'),
  dimensions: DimensionsSelector(state),
  position: PositionSelector(state),
  rows: RowNameSelector(state),
  sortInfo: SortSeletor(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(RowsContainer);

export default ConnectedContainer;
