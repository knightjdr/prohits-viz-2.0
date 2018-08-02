import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DimensionsSelector from '../../../../state/selectors/visualization/dimension-selector';
import PositionSelector from '../../../../state/selectors/visualization/position-selector';
import RowNameSelector from '../../../../state/selectors/visualization/row-name-selector';
import Rows from './heatmap-svg__rows';
import SearchSelector from '../../../../state/selectors/visualization/search-selector';
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
  shouldComponentUpdate = (nextProps) => {
    const {
      cellSize,
      dimensions,
      position,
      search,
      sortInfo,
    } = nextProps;
    return (
      cellSize !== this.props.cellSize ||
      dimensions.pageY !== this.props.dimensions.pageY ||
      position.y !== this.props.position.y ||
      search.match ||
      sortInfo.id !== this.props.sortInfo.id
    );
  }
  getPage = (rows, y, pageY) => {
    const pageEnd = y + pageY;
    return rows.slice(y, pageEnd);
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
        search={this.props.search}
        toggleTooltip={this.props.toggleTooltip}
      />
    );
  }
}

RowsContainer.propTypes = {
  cellSize: PropTypes.number.isRequired,
  dimensions: PropTypes.shape({
    pageY: PropTypes.number,
  }).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  position: PropTypes.shape({
    y: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  search: PropTypes.shape({
    match: PropTypes.bool,
    rows: PropTypes.shape({}),
    term: PropTypes.string,
  }).isRequired,
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
  search: SearchSelector(state),
  sortInfo: SortSeletor(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(RowsContainer);

export default ConnectedContainer;
